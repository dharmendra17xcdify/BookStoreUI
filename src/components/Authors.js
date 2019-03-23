import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody, Jumbotron, Container } from 'reactstrap';
 import ArundhatiRoy from '../images/ArundhatiRoy.jpg';
 import Chetan_Bhagat from '../images/Chetan_Bhagat.jpg';
 import Tagore from '../images/Tagore.jpg';
 import _ from 'lodash';

 const authorData = [
  {
    AuthorId: 1,
    AuthorName: 'Arundhati Roy',
    image: ArundhatiRoy,
    genre: 'Novel',
    AboutAuther: 'Suzanna Arundhati Roy (born 24 November 1961)[1] is an Indian author best known for her novel The God of Small Things (1997), which won the Man Booker Prize for Fiction in 1997 and became the biggest-selling book by a non-expatriate Indian author. She is also a political activist involved in human rights and environmental causes.'
  },
  {
    AuthorId: 2,
    AuthorName: 'Chetan Bhagat',
    image: Chetan_Bhagat,
    genre: 'Novel',
    AboutAuther: 'Suzanna Arundhati Roy (born 24 November 1961)[1] is an Indian author best known for her novel The God of Small Things (1997), which won the Man Booker Prize for Fiction in 1997 and became the biggest-selling book by a non-expatriate Indian author. She is also a political activist involved in human rights and environmental causes.'
  },
  {
    AuthorId: 3,
    AuthorName: 'Ravindranath Tagore',
    image: Tagore,
    genre: 'Novel',
    AboutAuther: 'Suzanna Arundhati Roy (born 24 November 1961)[1] is an Indian author best known for her novel The God of Small Things (1997), which won the Man Booker Prize for Fiction in 1997 and became the biggest-selling book by a non-expatriate Indian author. She is also a political activist involved in human rights and environmental causes.'
  },
  {
    AuthorId: 4,
    AuthorName: 'Arundhati Roy',
    image: ArundhatiRoy,
    genre: 'Novel',
    AboutAuther: 'Suzanna Arundhati Roy (born 24 November 1961)[1] is an Indian author best known for her novel The God of Small Things (1997), which won the Man Booker Prize for Fiction in 1997 and became the biggest-selling book by a non-expatriate Indian author. She is also a political activist involved in human rights and environmental causes.'
  }
];

 class Authors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data: []
    }

  }
  

  componentDidMount() {
   //this.setState({data: data});
  }

  componentWillMount() {

  }

  render(){
  return (
      <div>
      <Jumbotron fluid>
        <Container fluid>
        <CardDeck>
      {
        _.map(authorData, (res, i) => {
          return <Card key={'book-' + i}>
            <CardImg src={res.image} alt="Card image cap" />
            <CardBody>
              <CardTitle>{res.AuthorName}</CardTitle>
              <CardSubtitle>{res.genre}</CardSubtitle>
              {/* <CardText>{res.AboutAuther}</CardText> */}
              <Button color="primary" href="/addbook">Edit</Button> {' '}
              <Button color="danger">Delete</Button>
            </CardBody>
          </Card>
        })
      }
      </CardDeck>
      </Container>
      </Jumbotron>
    </div>
    
  );
  }
};

export default Authors;