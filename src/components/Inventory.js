import React from 'react';
import { Table, Button } from 'reactstrap';
import _ from 'lodash';

const invData = [
  {
    InventoryId: 1,
    BookId: 1,
    BookName : 'The God of Small Things',
    AutherId: 1,
    AutherName : 'Arundhati Roy',
    BookQuantityAvail: 100,
    BookQuantitySold: 10,
    BookQuantityOnOrder: 12,
    BookQuantityTotal: 150
  },
  {
    InventoryId: 2,
    BookId: 1,
    BookName : 'Mahabharata',
    AutherId: 1,
    AutherName : 'Vyasa',
    BookQuantityAvail: 100,
    BookQuantitySold: 10,
    BookQuantityOnOrder: 12,
    BookQuantityTotal: 150
  },
  {
    InventoryId: 3,
    BookId: 1,
    BookName : 'Bhagavad Gita',
    AutherId: 1,
    AutherName : 'Vyasa',
    BookQuantityAvail: 100,
    BookQuantitySold: 10,
    BookQuantityOnOrder: 12,
    BookQuantityTotal: 150
  },
  {
    InventoryId: 4,
    BookId: 1,
    BookName : '2 States: The Story of My Marriage',
    AutherId: 1,
    AutherName : 'Chetan Bhagat',
    BookQuantityAvail: 100,
    BookQuantitySold: 10,
    BookQuantityOnOrder: 12,
    BookQuantityTotal: 150
  }
]

export default class Inventory extends React.Component {
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

  render() {
    return (
      <div className="container">
      <h2>Inventory Details</h2>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Available Qty</th>
            <th>Sold Qty</th>
            <th>OnOrder Qty</th>
            <th>Total Qty</th>
          </tr>
        </thead>
        {
          _.map(invData, (res, i) => {
            return <tbody key={'book-' + i}>
                <tr>
                <th scope="row">{res.InventoryId}</th>
                <td>{res.BookName}</td>
                <td>{res.AutherName}</td>
                <td>{res.BookQuantityAvail}</td>
                <td>{res.BookQuantitySold}</td>
                <td>{res.BookQuantityOnOrder}</td>
                <td>{res.BookQuantityTotal}</td>
                <td><Button color="primary" href="/add-inventory">Edit</Button> {' '}
                <Button color="danger">Delete</Button></td>
              </tr>
            </tbody>
          })
        }
      </Table>
      <Button color="primary" href="/add-inventory">Add an Inventory</Button>
      </div>
    );
  }
}