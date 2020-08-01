import React, {useState} from 'react';
import {isEmpty} from 'lodash';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import './App.css';
import defaultValues from './default-values'

const fetchOrPrepopulate = (key, defaultValues) => {
  let storedValues = reactLocalStorage.getObject(key, false);
  if (storedValues === false) {
    reactLocalStorage.setObject(key, defaultValues);
  }
  return reactLocalStorage.getObject(key);
}


function App() {
    const [updatingVersion, setUpdatingVersion] = useState(0);

    const [editingTodo, setEditingTodo] = useState({});
    const [todoFormShown, setTodoFormShown] = useState(false);
    const [editingShortcut, setEditingShortcut] = useState({});
    const [shortcutFormShown, setShortcutFormShown] = useState(false);

    let urls = fetchOrPrepopulate('urls', defaultValues.urls);
    let todos = fetchOrPrepopulate('todos', defaultValues.todos);

    var urlParams = new URLSearchParams(window.location.search);
    var key = urlParams.get('key');

    const keyToUrlItem = urls.reduce((acc, urlItem) => {
      acc[urlItem.keyword] = urlItem;
      return acc;
    }, {});

    var urlItem = keyToUrlItem[key];
    if (urlItem) {
      window.location = urlItem.url;
      return null;
    }
    
    return <>
     <div style={{margin: "40px"}}>

        {/* TODO items */}

        <div style={{marginBottom: "40px"}}>
          <h3>Todos</h3>
          {todos.length !== 0 &&
            <>
              <div style={{marginBottom: "30px"}}>
                {todos.map((todoItem, idx) => 
                  <div key={todoItem['title'] + idx}>
                    <div style={{display: "flex", alignItems: "center", marginBottom: "0px"}}>

                      <IconButton aria-label="Delete" component="span" onClick={() => {
                          reactLocalStorage.setObject('todos', todos.filter(item => item.title !== todoItem.title));
                          setUpdatingVersion(updatingVersion + 1);
                        }
                      }>
                        <DeleteForever />
                      </IconButton>

                      <IconButton aria-label="Edit" component="span" onClick={() => {
                          setEditingTodo(todos.find(item => item.title === todoItem.title));
                          setTodoFormShown(true);
                        }
                      }>
                        <EditIcon />
                      </IconButton>

                      <h4 style={{color: todoItem['done'] === undefined ? 'orange' : todoItem['done'] ? 'green' : 'red'}}>{idx + 1}_ {todoItem['title']}</h4>
                    </div>
                    {todoItem.desc && todoItem.desc}
                    {todoItem.link && (<div><a href={todoItem.link}>{todoItem.link}</a></div>)}
                  </div>)
                }
              </div>
              <hr/>
            </>
          }
          {todoFormShown ? 
            <Formik
              initialValues={{ 
                title: editingTodo.title || '',
                link: editingTodo.link || ''
              }}
              onSubmit={(values) => {
                if (isEmpty(editingTodo)) {
                  todos.push({title: values.title, link: values.link});
                }
                else {
                  const todoItem = todos.find(item => item.title === editingTodo.title);
                  todoItem.title = values.title;
                  todoItem.link = values.link;
                }
                setEditingTodo({});
                reactLocalStorage.setObject('todos', todos);
                setTodoFormShown(false);
              }}
            >
              <Form>
                <div style={{display: "flex", width: "500px", marginBottom: "5px"}}>
                  <label htmlFor="title" style={{flex: 1}}>Title</label>
                  <div style={{"flex": 4}}>
                    <Field type="text" name="title" style={{width:"100%"}}/>
                  </div>
                </div>
                <div style={{display: "flex", width: "500px", marginBottom: "5px"}}>
                  <label htmlFor="link" style={{"flex": 1}}>Link</label>
                  <div style={{"flex": 4}}>
                    <Field type="text" name="link" style={{width:"100%"}}/>
                  </div>
                </div>
                <div style={{display: "flex"}}>
                  <Button type="submit" style={{marginRight: "5px"}} variant="contained" color="primary">
                    Submit
                  </Button>
                  <Button color="primary" onClick={() => {setEditingTodo({}); setTodoFormShown(false)}}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Formik>
            : 
            <Button color="primary" onClick={() => setTodoFormShown(true)}> + Add todo</Button>
        }
        </div>


        {/* SHORTCUTS */}

        <h3>Shortcuts</h3>  
        {urls.length !== 0 &&
          <div>
            {Object.keys(keyToUrlItem).map(key => (
                <div key={key} style={{display: "flex", alignItems: "center"}}>
                  
                  <IconButton aria-label="Delete" component="span" onClick={() => {
                      reactLocalStorage.setObject('urls', urls.filter(urlItem => urlItem.keyword !== keyToUrlItem[key].keyword));
                      setUpdatingVersion(updatingVersion + 1);
                    }}>
                    <DeleteForever />
                  </IconButton>

                  <IconButton aria-label="Edit" component="span" onClick={() => {
                      setEditingShortcut(urls.find(item => item.keyword === keyToUrlItem[key].keyword));
                      setShortcutFormShown(true);
                    }
                  }>
                    <EditIcon />
                  </IconButton>

                  <p>{key}: {keyToUrlItem[key].description} -> <a href={keyToUrlItem[key].url}>{keyToUrlItem[key].url}</a></p>
                </div>
                )
            )}
            <hr/>
          </div>
        }
        {shortcutFormShown ? 
          <Formik
          initialValues={{ 
            keyword: editingShortcut.keyword || '',
            description: editingShortcut.description || '',
            url: editingShortcut.url || ''
          }}
          onSubmit={(values) => {
            if (isEmpty(editingShortcut)) {
              urls.push({keyword: values.keyword, url: values.url, description: values.description});
            }
            else {
              const shortcutItem = urls.find(item => item.keyword === editingShortcut.keyword);
              shortcutItem.keyword = values.keyword;
              shortcutItem.description = values.description;
              shortcutItem.url = values.url;
            }
            
            setEditingShortcut({});
            reactLocalStorage.setObject('urls', urls);
            setShortcutFormShown(false);
          }}
        >
          <Form>
            <div style={{"display": "flex", "width": "500px", "marginBottom": "5px"}}>
              <label htmlFor="keyword" style={{"flex": 1}}>Keyword</label>
              <div style={{"flex": 2}}>
                <Field type="text" name="keyword"/>
              </div>
            </div>
            <div style={{"display": "flex", "width": "500px", "marginBottom": "5px"}}>
              <label htmlFor="description" style={{"flex": 1}}>Description</label>
              <div style={{"flex": 2}}>
                <Field type="text" name="description" style={{width:"100%"}}/>
              </div>
            </div>
            <div style={{"display": "flex", "width": "500px", "marginBottom": "5px"}}>
              <label htmlFor="url" style={{"flex": 1}}>Url</label>
              <div style={{"flex": 2}}>
                <Field type="text" name="url" style={{width:"100%"}}/>
              </div>
            </div>
            <div style={{"display": "flex"}}>
              <Button type="submit" style={{marginRight: "5px"}} variant="contained" color="primary">
                Submit
              </Button>
              <Button color="primary" onClick={() => {setEditingShortcut({}); setShortcutFormShown(false)}}>
                Cancel
              </Button>
            </div>
            </Form>
          </Formik>
          : 
          <Button color="primary" onClick={() => setShortcutFormShown(true)}> + Add shortcut</Button>
        }
    </div>
    </>;
}

export default App;
