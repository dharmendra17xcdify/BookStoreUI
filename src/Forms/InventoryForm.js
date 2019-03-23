import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
import './BookForm.css';

export default class InventoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data: []
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  

  componentDidMount() {
   //this.setState({data: data});
  }

  componentWillMount() {

  }

  handleFormSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <Form className="container">
      <h2>Fill Inventory Information</h2>
        <FormGroup>
          <Label for="bookName">Book Name</Label>
          <Input type="select" name="bookName" id="bookName">
          <option>Select</option>
            <option>Book1</option>
            <option>Book2</option>
            <option>Book3</option>
            <option>Book4</option>
            <option>Book5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="authorName">Author Name</Label>
          <Input type="select" name="authorName" id="authorName">
          <option>Select</option>
            <option>Author1</option>
            <option>Author2</option>
            <option>Author3</option>
            <option>Author4</option>
            <option>Author5</option>
          </Input>
        </FormGroup>
        <FormGroup >
          <Label for="AvailableQty">Available Qty</Label>
          <Input type="number" placeholder="Available Qty"/>
        </FormGroup>
        <FormGroup>
          <Label for="soldQty">Sold Qty</Label>
          <Input type="number" placeholder="Sold Qty"/>
        </FormGroup>
        <FormGroup>
          <Label for="onOrder">Quantity OnOrder</Label>
          <Input type="number" placeholder="Quantity OnOrder"/>
        </FormGroup>
        <FormGroup>
          <Label for="total">Total</Label>
          <Input type="number" placeholder="Sold Qty"/>
        </FormGroup>
        
        <Button color="primary" type="submit" onClick={this.handleFormSubmit}>Save</Button> {' '}
        <Button color="info">Clear</Button>
      </Form>
    );
  }
}