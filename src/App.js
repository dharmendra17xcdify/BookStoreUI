import React, { Component } from 'react';
import logo from './logo.svg';
import icons from 'glyphicons'
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
import AuthorForm from './Forms/AuthorForm';
import InventoryForm from './Forms/InventoryForm';
import PageNotFound from './components/PageNotFound';
import { connect } from 'react-redux';

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
        <Route exact path={routes.ADD_AUTHOR} component={AuthorForm} />
        <Route exact path={routes.ADD_INVENTORY} component={InventoryForm} />
        <Route component={PageNotFound} />
      </Switch>
      <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
      <footer className="container-fluid footer text-center">
        <p>Developed By  <a href="http://www.Xcdify.com/">www.Xcdify.com</a></p> 
      </footer>
    </div>
  </Router>
    );
  }
}

class ScrollButton extends React.Component {
  constructor() {
    super();

    this.state = {
        intervalId: 0
    };
  }
  
  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }
  
  render () {
      return <button title='Back to top' className='scroll' 
               onClick={ () => { this.scrollToTop(); }}><b>Top</b>
                {/* <span className='arrow-up glyphicon glyphicon-chevron-up'></span> */}
              </button>;
   }
} 

export default App;
