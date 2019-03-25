import React from 'react';
import { Redirect } from 'react-router'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Alert  } from 'reactstrap';
import './BookForm.css';
import FormValidator from './FormValidator';
import _ from 'lodash';
import axios from 'axios';

const INITIAL_STATE = {
  authorId: null,
  authorName: '',
  aboutAuthor: '',
  genre: '',
  books: '',
  awards: ''
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

export default class AuthorForm extends React.Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      { 
        field: 'authorName', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Author Name is required.' 
      },
      { 
        field: 'aboutAuthor', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'About Author is required.' 
      },
      { 
        field: 'genre', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Genre is required.'
      },
      { 
        field: 'awards', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Awards is required.'
      },
      { 
        field: 'books', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Books is required.'
      }
    ]);

    this.state = {
      ...INITIAL_STATE,
      errorMessage: '',
      validation: this.validator.valid(),
     authorData: [],
     visible: true
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.submitted = false;
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }
  
  handleInputChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
   //this.setState({data: data});
  }

  componentWillMount() {

  }

  handleFormSubmit = event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation, ...INITIAL_STATE });
    console.log(this.state);

    let authorExist = _.find(this.state.authorData, {authorName: this.state.authorName})
    
    if(authorExist){
      this.setState({
        errorMessage: 'This Author already exists!.'
      })
    } else if (validation.isValid) {
      this.submitted = true;
      console.log("Author saved with name: ", this.state.authorName);

      if(this.state.authorId === null) {
        axios({
          method: 'post',
          url: 'http://localhost:9000/api/authors',
          data: {
            AuthorName: this.state.authorName,
            Genre: this.state.genre,
            AboutAuther: this.state.aboutAuthor
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        axios({
          method: 'put',
          url: 'http://localhost:9000/api/authors',
          data: {
            AuthorName: this.state.authorName,
            Genre: this.state.genre,
            AboutAuther: this.state.aboutAuthor
          },
          params: {
            authorId: this.state.authorId
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    } 
  }

  render() {

    if (this.submitted === true) {
      return ( <div>
        <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
          Auther saved successfully.
        </Alert>
        <Redirect to="/authors"/>
      </div>
      )
    }

    let validation = this.submitted && this.state.errorMessage === ''?  // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                      this.state.validation                   // otherwise just use what's in state

    return ( <div>
        <Form className="container was-validated">
        <h2>Fill Author Information</h2>
          <FormGroup>
          <div className={validation.authorName.isInvalid ? 'has-error' : ''}>
            <Label for="authorName"><b>Author Name</b></Label>
            <Input required
              maxLength={80} 
              name="authorName" 
              id="authorName" 
              placeholder="Enter Author Name"
              onChange={event => this.setState(byPropKey('authorName', event.target.value), this.handleInputChange(event))}
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
            {/* <FormText>*Required</FormText>
            <span className="help-block">{validation.authorName.message}</span> */}
          </div>
          </FormGroup>
          <FormGroup >
          <div className={validation.genre.isInvalid ? 'has-error' : ''}>
            <Label for="genre"><b>Genre</b></Label>
            <Input required
            maxLength={80} 
            name="genre" 
            id="genre" 
            placeholder="Enter Genre"
            onChange={event => this.setState(byPropKey('genre', event.target.value), this.handleInputChange(event))}/>
            {/* <FormText>*Required</FormText>
            <span className="help-block">{validation.genre.message}</span> */}
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          </FormGroup>
          <FormGroup >
          <div className={validation.awards.isInvalid ? 'has-error' : ''}>
            <Label for="awards"><b>Awards</b></Label>
            <Input required
            maxLength={80} 
            name="awards" 
            id="awards" 
            placeholder="Enter Awards"
            onChange={event => this.setState(byPropKey('awards', event.target.value), this.handleInputChange(event))}/>
            {/* <FormText>*Required</FormText>
            <span className="help-block">{validation.genre.message}</span> */}
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          </FormGroup>
          <FormGroup >
          <div className={validation.books.isInvalid ? 'has-error' : ''}>
            <Label for="books"><b>Books</b></Label>
            <Input required
            maxLength={80} 
            name="books" 
            id="books" 
            placeholder="Enter Books"
            onChange={event => this.setState(byPropKey('books', event.target.value), this.handleInputChange(event))}/>
            {/* <FormText>*Required</FormText>
            <span className="help-block">{validation.genre.message}</span> */}
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          </FormGroup>
          <FormGroup>
          <div className={validation.aboutAuthor.isInvalid ? 'has-error' : ''}>
            <Label for="aboutAuthor"><b>About Auther</b></Label>
            <Input required
            maxLength={255} 
            name="aboutAuthor" 
            id="aboutAuthor" 
            placeholder="Enter About Auther"
            onChange={event => this.setState(byPropKey('aboutAuthor', event.target.value), this.handleInputChange(event))}/>
            {/* <FormText>*Required</FormText>
            <span className="help-block">{validation.aboutAuthor.message}</span> */}
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          </FormGroup>
          
          <Button color="primary" type="submit" onClick={this.handleFormSubmit}>Save</Button> {' '}
          <Button color="info">Clear</Button>
        </Form>
    </div>
    );
  }
}