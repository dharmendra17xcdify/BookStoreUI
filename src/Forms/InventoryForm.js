import React from 'react';
import { Redirect } from 'react-router';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
import './BookForm.css';
import FormValidator from './FormValidator';
import _ from 'lodash';

const INITIAL_STATE = {
  bookName: '',
  authorName: '',
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
      inventoryData: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.submitted = false;
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

    let bookExist = _.find(this.state.inventoryData, {bookName: this.state.bookName})
    
    if(bookExist){
      this.setState({
        errorMessage: 'This Book already exists!.'
      })
    } else if (validation.isValid) {
      this.submitted = true;
      console.log("Inventory saved with name: ", this.state.bookName);
    } 
  }

  render() {

    if (this.submitted === true) {
      return (
      <Redirect to="/inventory"/>
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
          <Input type="select" name="bookName" id="bookName" 
          onChange={event => this.setState(byPropKey('bookName', event.target.value), this.handleInputChange(event))}>
          <option>Select</option>
            <option>Book1</option>
            <option>Book2</option>
            <option>Book3</option>
            <option>Book4</option>
            <option>Book5</option>
          </Input>
          <FormText>*Required</FormText>
          <span className="help-block">{validation.bookName.message}</span>
        </div>
        </FormGroup>
        <FormGroup>
        <div className={validation.authorName.isInvalid ? 'has-error' : ''}>
          <Label for="authorName"><b>Author Name</b></Label>
          <Input type="select" name="authorName" id="authorName"
          onChange={event => this.setState(byPropKey('authorName', event.target.value), this.handleInputChange(event))}>
          <option>Select</option>
            <option>Author1</option>
            <option>Author2</option>
            <option>Author3</option>
            <option>Author4</option>
            <option>Author5</option>
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