import React from 'react';
import './App.css';

import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import App from './App';

class AppRoutes extends React.Component {
  
  render() {
    return <Router>
      <Switch>
    <Route path="/operator">
      <App />
    </Route>
    <Redirect to="/operator" />
  </Switch>
  </Router>
  }
}

export default AppRoutes;
