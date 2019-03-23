import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
import './BookForm.css';

export default class BookForm extends React.Component {
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
      <h2>Fill Book Information</h2>
        <FormGroup >
          <Label for="bookName">Book Name</Label>
          <Input placeholder="Book Name"/>
          <FormFeedback valid>Sweet! that name is available</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
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
          <FormFeedback>Oh noes! that name is already taken</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="datePublished">Date Published</Label>
          <Input type="date"
            name="datePublished"
            id="datePublished"
            placeholder="Date Published"/>
          <FormFeedback tooltip>You will not be able to see this</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup >
          <Label for="Publication">Publication</Label>
          <Input placeholder="Publication"/>
          <FormFeedback valid>Sweet! that name is available</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup >
          <Label for="Publisher">Publisher</Label>
          <Input placeholder="Publisher"/>
          <FormFeedback valid>Sweet! that name is available</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup >
          <Label for="About">About</Label>
          <Input placeholder="About"/>
          <FormFeedback valid>Sweet! that name is available</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup >
          <Label for="Genre">Genre</Label>
          <Input placeholder="Genre"/>
          <FormFeedback valid>Sweet! that name is available</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <Button color="primary" type="submit" onClick={this.handleFormSubmit}>Save</Button> {' '}
        <Button color="info">Clear</Button>
      </Form>
    );
  }
}