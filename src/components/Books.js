import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody, Jumbotron, Container } from 'reactstrap';
 import { Link, withRouter, } from 'react-router-dom';
 import Isolt from '../images/isolt.jpg';
 import TheGod from '../images/thegod.jpg';
 import Agni from '../images/agni.jpg';
 import mahabharat from '../images/mahabharat.jpg';
 import gita from '../images/gita.jpg';
 import States from '../images/2_States.jpg';
 import './Books.css';
 import * as routes from '../constants/routes';
 import data from '../constants/data';
 import _ from 'lodash';

 const books = [
  {
      bookId: 1,
      name: 'The God of Small Things',
      authorName: 'Arundhati Roy',
      image: TheGod,
      authorId: 1,
      datePublished: '17/08/1997',
      publication: 'Indian Publication',
      publisher: 'IndiaInk, India',
      about: 'The God of Small Things is the debut novel of Indian writer Arundhati Roy. It is a story about the childhood experiences of fraternal twins whose lives are destroyed by the "Love Laws" that lay down "who should be loved, and how. And how much."',
      genre: 'Novel'
  },
  {
      bookId: 2,
      name: 'Mahabharata',
      authorName: ' Vyasa',
      image: mahabharat,
      authorId: 2,
      datePublished: '17/08/1000',
      publication: 'Indian Publication',
      publisher: 'IndiaInk, India',
      about: 'The Mahābhārata (US: /məhɑːˈbɑːrətə/,[1] UK: /ˌmɑːhəˈbɑːrətə/;[2] Sanskrit: महाभारतम्, Mahābhāratam, pronounced [mɐɦaːˈbʱaːɽɐtɐm]) is one of the two major Sanskrit epics of ancient India, the other being the Rāmāyaṇa',
      genre: 'Novel'
  },
  {
      bookId: 3,
      name: 'Bhagavad Gita',
      authorName: 'Vyasa',
      image: gita,
      authorId: 3,
      datePublished: '17/08/700',
      publication: 'Indian Publication',
      publisher: 'IndiaInk, India',
      about: 'The Bhagavad Gita (/ˌbʌɡəvəd ˈɡiːtɑː, -tə/; Sanskrit: भगवद्गीता, IAST: bhagavad-gītā, lit. "The Song of God"),[1] often referred to as the Gita, is a 700-verse Sanskrit scripture that is part of the Hindu epic Mahabharata (chapters 23–40 of Bhishma Parva).',
      genre: 'Novel'
  },
  {
      bookId: 4,
      name: '2 States: The Story of My Marriage',
      authorName: 'Chetan Bhagat',
      image: States,
      authorId: 4,
      datePublished: '08/10/2009',
      publication: 'Indian Publication',
      publisher: 'Rupa Publications Pvt. Ltd',
      about: '2 States: The Story of My Marriage[1] commonly known as 2 States[2] is a 2009 novel written by Chetan Bhagat.[3] It is the story about a couple coming from two different states in India, who face hardships in convincing their parents to approve of their marriage.',
      genre: 'Novel'
  },
  // {
  //     bookId: 5,
  //     name: 'Agni Ki Udaan',
  //     authorName: ' A. P. J. Abdul Kalam, Arun Tiwari',
  //     image: 'images/authors/marktwain.jpg',
  //     authorId: 5,
  //     datePublished: '17/08/1997',
  //     publication: 'Indian Publication',
  //     publisher: 'Universities Press',
  //     about: 'Wings of Fire: An Autobiography of A P J Abdul Kalam (1999), former President of India. It was written by Dr. Kalam and Arun Tiwari.[1] Kalam examines his early life, effort, hardship, fortitude, luck and chance that eventually led him to lead Indian space research, nuclear and missile programs. ',
  //     genre: 'Autobiography'
  // }
];

 class Books extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
      bookData: []
     }
   }

   componentDidMount() {
    fetch('http://localhost:9000/api/books')
    .then( result => {
      return result.json();
    }).then( data => {
      this.setState({bookData: data});
    })
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
           _.map(this.state.bookData, (res, i) => {
             return <Card key={'book-' + i}>
              <CardImg className="book-image" src={mahabharat} alt="Card image cap" />
              <CardBody>
                <CardTitle><strong>Title : </strong>  {res.bookName}</CardTitle>
                <CardSubtitle><strong>Author : </strong> {res.authorName}</CardSubtitle>
                <CardSubtitle><strong>Genre : </strong> {res.genre}</CardSubtitle>
                {/* <CardText>{res.about}</CardText> */}
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

export default Books;