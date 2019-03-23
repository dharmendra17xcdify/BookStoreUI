import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,Switch
} from 'react-router-dom';
import Navigation from './components/Navigation';
import Books from './components/Books';
import Inventory from './components/Inventory';
import Authors from './components/Authors';
import Landing from './components/Landing';
import * as routes from './constants/routes';
import BookForm from './Forms/BookForm';

class App extends Component {
  render() {
    return (
      <Router>
    <div>
      <Navigation />

      <hr/>
      <Switch>
        <Route exact path="/" component = {Landing}/>
        <Route exact path={routes.BOOKS} component={Books} />
        <Route exact path={routes.INVENTORY} component={Inventory} />
        <Route exact path={routes.AUTHORS} component={Authors} />
        <Route exact path={routes.ADD_BOOK} component={BookForm} />
      </Switch>
      <footer className="container-fluid footer text-center">
        <p>Developed By  <a href="http://www.Xcdify.com/">www.Xcdify.com</a></p> 
      </footer>
    </div>
  </Router>
    );
  }
}

export default App;
