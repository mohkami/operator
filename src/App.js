import React from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';

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

    const shortcuts = Object.keys(keyToUrlItem).map(
      key => <p key={key}>{key}: {keyToUrlItem[key].description} -> <a href={keyToUrlItem[key].url}>{keyToUrlItem[key].url}</a></p>
      );

    const todoItems = todos.map((todoItem, idx) => 
    <div key={todoItem['title']}>
      <h4 style={{color: todoItem['done'] === undefined ? 'orange' : todoItem['done'] ? 'green' : 'red'}}>{idx + 1}_ {todoItem['title']}</h4>
      {todoItem.desc && todoItem.desc}
      {todoItem.link && (<p><a href={todoItem.link}>{todoItem.link}</a></p>)}
    </div>
    );
    
    const sections = [
      {
        header: 'Todos',
        items: todoItems
      },
      {
        header: 'Shortcuts',
        items: shortcuts
      },
    ]
    
    return <div style={{"margin":"40px"}}>
      {sections.map((section, idx) =>
        section['items'].length !== 0 &&
        <div key={idx}>
          <h3>{section['header']}</h3>
          {section['items']}
          <hr/>
        </div>
        )}
    </div>;
}

export default App;
