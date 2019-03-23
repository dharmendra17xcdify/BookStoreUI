import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
import './BookForm.css';

export default class AuthorForm extends React.Component {
  render() {
    return (
      <Form className="container">
      <h2>Fill Author Information</h2>
        <FormGroup>
          <Label for="authorName">Author Name</Label>
          <Input placeholder="Author Name"/>
          <FormFeedback>Oh noes! that name is already taken</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup >
          <Label for="Genre">Genre</Label>
          <Input placeholder="Genre"/>
          <FormFeedback valid>Sweet! that name is available</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="AboutAuther">About Auther</Label>
          <Input placeholder="About Auther"/>
          <FormFeedback tooltip>You will not be able to see this</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        
        <Button color="primary">Save</Button> {' '}
          <Button color="info">Clear</Button>
      </Form>
    );
  }
}