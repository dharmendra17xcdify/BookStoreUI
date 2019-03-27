import React from 'react';
import { Redirect } from 'react-router';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Alert  } from 'reactstrap';
import './BookForm.css';
import FormValidator from './FormValidator';
import _ from 'lodash';
import axios from 'axios';

const INITIAL_STATE = {
  inventoryId: null,
  bookId: null,
  bookName: '',
  authorName: '',
  authorId: null,
  qtyAvail: '',
  qtySold: '',
  qtyOnOrder: '',
  total: '',
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

export default class InventoryForm extends React.Component {
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
        field: 'qtyAvail', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Available Qty is required.' 
      },
      { 
        field: 'qtySold', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Sold Qty is required.' 
      },
      { 
        field: 'qtyOnOrder', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'On Order Qty is required.' 
      },
      { 
        field: 'total', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Total is required.' 
      }
    ]);

    this.state = {
      ...INITIAL_STATE,
      errorMessage: '',
      validation: this.validator.valid(),
      inventoryData: [],
      authorData: [],
      bookData: [],
      selectedBook: '',
      selectedAuthor: '',
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
    } else if(event.target.name === 'bookName') {
      this.setState({
        selectedBook: event.target.value
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

    fetch('http://localhost:9000/api/books')
    .then( result => {
      return result.json();
    }).then( data => {
      this.setState({bookData: data});
    })
  }

  componentWillMount() {

  }

  handleFormSubmit = event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation, ...INITIAL_STATE });
    console.log(this.state);

    let bookExist = _.find(this.state.inventoryData, {bookName: this.state.bookName})

    let author = _.find(this.state.authorData, {authorName: this.state.selectedAuthor});

    let book = _.find(this.state.bookData, {bookName: this.state.selectedBook});
    
    if(bookExist){
      this.setState({
        errorMessage: 'This Book already exists!.'
      })
    } else if (validation.isValid) {
      this.submitted = true;
      console.log("Inventory saved with name: ", this.state.bookName);

      if(this.state.inventoryId === null) {
        axios({
          method: 'post',
          url: 'http://localhost:9000/api/inventory',
          data: {
            BookId: book.bookId,
            BookName: this.state.bookName,
            AuthorName: this.state.authorName,
            AuthorId: author.authorId,
            BookQuantityAvail: this.state.qtyAvail,
            BookQuantitySold: this.state.qtySold,
            BookQuantityOnOrder: this.state.qtyOnOrder,
            BookQuantityTotal: this.state.total
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
          url: 'http://localhost:9000/api/inventory',
          data: {
            BookId: this.state.bookId,
            BookName: this.state.bookName,
            AuthorName: this.state.authorName,
            AuthorId: this.state.authorId,
            BookQuantityAvail: this.state.qtyAvail,
            BookQuantitySold: this.state.qtySold,
            BookQuantityOnOrder: this.state.qtyOnOrder,
            BookQuantityTotal: this.state.total
          },
          params: {
            inventoryId: this.state.inventoryId
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
          Inventory saved successfully.
        </Alert>
        <Redirect to="/inventory"/>
      </div>
      )
    }

    let validation = this.submitted && this.state.errorMessage === ''?  // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                      this.state.validation                   // otherwise just use what's in state


    return (
      <Form className="container">
      <h2>Fill Inventory Information</h2>
        <FormGroup>
        <div className={validation.bookName.isInvalid ? 'has-error' : ''}>
          <Label for="bookName"><b>Book Name</b></Label>
          <Input value={this.state.selectedBook}
          type="select" 
          name="bookName" 
          id="bookName"
          onChange={event => this.setState(byPropKey('bookName', event.target.value), this.handleInputChange(event))}>
          {
            _.map(this.state.bookData, (book, i) => {
              return <option key={'book-' + i}  key={book.bookId} value={book.bookName}>{book.bookName}</option>
            })
          }
          </Input>
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
        <FormGroup >
        <div className={validation.qtyAvail.isInvalid ? 'has-error' : ''}>
          <Label for="qtyAvail"><b>Available Qty</b></Label>
          <Input type="number" 
            name="qtyAvail"
            id="qtyAvail" 
            placeholder="Enter Available Qty"
            onChange={event => this.setState(byPropKey('qtyAvail', event.target.value), this.handleInputChange(event))}/>
            <FormText>*Required</FormText>
          <span className="help-block">{validation.qtyAvail.message}</span>
        </div>
        </FormGroup>
        <FormGroup>
        <div className={validation.qtySold.isInvalid ? 'has-error' : ''}>
          <Label for="qtySold"><b>Sold Qty</b></Label>
          <Input type="number" 
          name="qtySold"
          id="qtySold" 
          placeholder="Enter Sold Qty"
          onChange={event => this.setState(byPropKey('qtySold', event.target.value), this.handleInputChange(event))}/>
          <FormText>*Required</FormText>
          <span className="help-block">{validation.qtySold.message}</span>
        </div>
        </FormGroup>
        <FormGroup>
        <div className={validation.qtyOnOrder.isInvalid ? 'has-error' : ''}>
          <Label for="qtyOnOrder"><b>Quantity OnOrder</b></Label>
          <Input type="number" 
          name="qtyOnOrder"
          id="qtyOnOrder" 
          placeholder="Enter Quantity OnOrder"
          onChange={event => this.setState(byPropKey('qtyOnOrder', event.target.value), this.handleInputChange(event))}/>
          <FormText>*Required</FormText>
          <span className="help-block">{validation.qtyOnOrder.message}</span>
        </div>
        </FormGroup>
        <FormGroup>
        <div className={validation.total.isInvalid ? 'has-error' : ''}>
          <Label for="total"><b>Total</b></Label>
          <Input type="number" 
          name="total"
          id="total" 
          placeholder="Enter Sold Qty"
          onChange={event => this.setState(byPropKey('total', event.target.value), this.handleInputChange(event))}/>
          <FormText>*Required</FormText>
          <span className="help-block">{validation.total.message}</span>
        </div>
        </FormGroup>
        
        <Button color="primary" type="submit" onClick={this.handleFormSubmit}>Save</Button> {' '}
        <Button color="info">Clear</Button>
      </Form>
    );
  }
}