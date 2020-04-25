import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/landing';
import Table from './components/table';

import './App.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/table" component={Table} />
    </Switch>
  </Router>
);

export default App;