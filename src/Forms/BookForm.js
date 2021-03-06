import React from 'react';
import { Redirect } from 'react-router';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Alert } from 'reactstrap';
import './BookForm.css';
import FormValidator from './FormValidator';
import _ from 'lodash';
import axios from 'axios';

const INITIAL_STATE = {
  bookId: null,
  bookName: '',
  authorName: '',
  datePublished: '',
  publication: '',
  publisher: '',
  about: '',
  genre: '',
  authorId: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

export default class BookForm extends React.Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      { 
        field: 'bookName', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Book Name is required.' 
      },
      { 
        field: 'authorName', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Author Name is required.' 
      },
      { 
        field: 'datePublished', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Date Published is required.' 
      },
      { 
        field: 'publication', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Publication is required.' 
      },
      { 
        field: 'publisher', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Publisher is required.' 
      },
      { 
        field: 'about', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Description is required.' 
      },
      { 
        field: 'genre', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Genre is required.'
      }
    ]);

    this.state = {
      ...INITIAL_STATE,
      errorMessage: '',
      validation: this.validator.valid(),
     bookData: [],
     authorData: [],
     selectedAuthor: '',
     authorId: null,
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

    if(event.target.name === 'authorName') {
      this.setState({
        selectedAuthor: event.target.value
      })
    }
  }
  

  componentDidMount() {
    fetch('http://localhost:9000/api/authors')
    .then( result => {
      return result.json();
    }).then( data => {
      this.setState({authorData: data});
    })
  }

  componentWillMount() {

  }

  handleFormSubmit = event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation, ...INITIAL_STATE });
    console.log(this.state);

    let bookExist = _.find(this.state.bookData, {bookName: this.state.bookName});
    let author = _.find(this.state.authorData, {authorName: this.state.selectedAuthor});

    if(bookExist){
      this.setState({
        errorMessage: 'This Book already exists!.'
      })
    } else if (validation.isValid) {
      this.submitted = true;
      console.log("Book saved with name: ", this.state.bookName);

      if(this.state.bookId === null) {
        axios({
          method: 'post',
          url: 'http://localhost:9000/api/books',
          data: {
            BookName: this.state.bookName,
            AuthorName: this.state.authorName,
            AuthorId: author.authorId,
            DatePublished: this.state.datePublished,
            Publication: this.state.publication,
            Publisher: this.state.publisher,
            About: this.state.about,
            Genre: this.state.genre
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
          url: 'http://localhost:9000/api/books',
          data: {
            BookName: this.state.bookName,
            AuthorName: this.state.aboutAuthor,
            AuthorId: this.state.authorId,
            DatePublished: this.state.datePublished,
            Publication: this.state.publication,
            Publisher: this.state.publisher,
            About: this.state.about,
            Genre: this.state.genre
          },
          params: {
            bookId: this.state.bookId
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
          Book saved successfully.
        </Alert>
        <Redirect to="/books"/>
      </div>
      )
    }

    let validation = this.submitted && this.state.errorMessage === ''?  // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                      this.state.validation                   // otherwise just use what's in state

    return (
      <Form className="container">
      <h2>Fill Book Information</h2>
        <FormGroup >
        <div className={validation.bookName.isInvalid ? 'has-error' : ''}>
          <Label for="bookName"><b>Book Name</b></Label>
          <Input 
            maxLength={80} 
            name="bookName" 
            id="bookName" 
            placeholder="Enter Book Name"
            onChange={event => this.setState(byPropKey('bookName', event.target.value), this.handleInputChange(event))}
          />
          <FormText>*Required</FormText>
          <span className="help-block">{validation.bookName.message}</span>
        </div>
        </FormGroup>
        <FormGroup>
        <div className={validation.authorName.isInvalid ? 'has-error' : ''}>
          <Label for="authorName"><b>Author Name</b></Label>
          <Input value={this.state.selectedAuthor}
          type="select" 
          name="authorName" 
          id="authorName"
          onChange={event => this.setState(byPropKey('authorName', event.target.value), this.handleInputChange(event))}>
          {
            _.map(this.state.authorData, (author, i) => {
              return <option key={'author-' + i}  key={author.authorId} value={author.authorName}>{author.authorName}</option>
            })
          }
          
          </Input>
          <FormText>*Required</FormText>
          <span className="help-block">{validation.authorName.message}</span>
        </div>
        </FormGroup>
        <FormGroup>
        <div className={validation.datePublished.isInvalid ? 'has-error' : ''}>
          <Label for="datePublished"><b>Date Published</b></Label>
          <Input type="date"
            name="datePublished"
            id="datePublished"
            placeholder="Date Published"
            onChange={event => this.setState(byPropKey('datePublished', event.target.value), this.handleInputChange(event))}/>
          <FormText>*Required</FormText>
          <span className="help-block">{validation.datePublished.message}</span>
        </div>
        </FormGroup>
        <FormGroup >
        <div className={validation.publication.isInvalid ? 'has-error' : ''}>
          <Label for="publication"><b>Publication</b></Label>
          <Input 
          maxLength={80} 
          name="publication"
          id="publication"
          placeholder="Enter Publication"
          onChange={event => this.setState(byPropKey('publication', event.target.value), this.handleInputChange(event))}/>
          <FormText>*Required</FormText>
          <span className="help-block">{validation.publication.message}</span>
        </div>
        </FormGroup>
        <FormGroup >
        <div className={validation.publisher.isInvalid ? 'has-error' : ''}>
          <Label for="publisher"><b>Publisher</b></Label>
          <Input 
          maxLength={80} 
          name="publisher"
          id="publisher"
          placeholder="Enter Publisher"
          onChange={event => this.setState(byPropKey('publisher', event.target.value), this.handleInputChange(event))}/>
          <FormText>*Required</FormText>
          <span className="help-block">{validation.publisher.message}</span>
        </div>
        </FormGroup>
        <FormGroup >
        <div className={validation.about.isInvalid ? 'has-error' : ''}>
          <Label for="about"><b>Description</b></Label>
          <Input 
          maxLength = {255}
          name="about"
          id="about"
          placeholder="Enter Book description"
          onChange={event => this.setState(byPropKey('about', event.target.value), this.handleInputChange(event))}/>
          <FormText>*Required</FormText>
          <span className="help-block">{validation.about.message}</span>
        </div>
        </FormGroup>
        <FormGroup >
        <div className={validation.genre.isInvalid ? 'has-error' : ''}>
          <Label for="genre"><b>Genre</b></Label>
          <Input
            maxLength = {80}
            name="genre"
            id="genre"
            placeholder="Enter genre"
            onChange={event => this.setState(byPropKey('genre', event.target.value), this.handleInputChange(event))}/>
          <FormText>*Required</FormText>
          <span className="help-block">{validation.genre.message}</span>
        </div>
        </FormGroup>
        <Button color="primary" type="submit" onClick={this.handleFormSubmit}>Save</Button> {' '}
        <Button color="info">Clear</Button>
      </Form>
    );
  }
}