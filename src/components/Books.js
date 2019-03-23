import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody, Jumbotron, Container } from 'reactstrap';
 import { Link, withRouter, } from 'react-router-dom';
 import Isolt from '../images/isolt.jpg';
 import TheGod from '../images/thegod.jpg';
 import Agni from '../images/agni.jpg';
 import './Books.css';
 import * as routes from '../constants/routes';
 import data from '../constants/data';

 class Books extends React.Component {
  render(){
  return (
    <div>
    <Jumbotron fluid>
      <Container fluid>
      <CardDeck>
      <Card>
        <CardImg className="book-image" src={Isolt} alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
          <Button color="primary" href="/addbook">Edit</Button> {' '}
          <Button color="danger">Delete</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg src={TheGod} alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
          <Button color="primary" href="/addbook">Edit</Button> {' '}
          <Button color="danger">Delete</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg src={Agni} alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
          <Button color="primary" href="/addbook">Edit</Button> {' '}
          <Button color="danger">Delete</Button>
        </CardBody>
      </Card>
    </CardDeck>
      </Container>
    </Jumbotron>
  </div>
    
  );
}
};

export default Books;