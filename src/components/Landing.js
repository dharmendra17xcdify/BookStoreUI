import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import halfgf from '../images/halfgf.jpg';
import johnfowles from '../images/johnfowles.jpg';
import revolution from '../images/revolution.jpg';
import '../Forms/BookForm.css';

const items = [
  {
    src: halfgf,
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: johnfowles,
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: revolution,
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

const Landing = () => <div className="container">
  <UncontrolledCarousel items={items} />
  </div>

export default Landing;