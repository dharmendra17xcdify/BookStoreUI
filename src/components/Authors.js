import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody, Jumbotron, Container } from 'reactstrap';
 import ArundhatiRoy from '../images/ArundhatiRoy.jpg';
 import Chetan_Bhagat from '../images/Chetan_Bhagat.jpg';
 import Tagore from '../images/Tagore.jpg';

 class Authors extends React.Component {
  render(){
  return (
    <div>
    <Jumbotron fluid>
      <Container fluid>
      <CardDeck>
      <Card>
        <CardImg top width="100%" src={Tagore} alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
          <Button color="primary" href="/addauthor">Edit</Button> {' '}
          <Button color="danger">Delete</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src={ArundhatiRoy} alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
          <Button color="primary" href="/addauthor">Edit</Button> {' '}
          <Button color="danger">Delete</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src={Chetan_Bhagat} alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
          <Button color="primary" href="/addauthor">Edit</Button> {' '}
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

export default Authors;