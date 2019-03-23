import React from 'react';
import { Table, Button } from 'reactstrap';

export default class Inventory extends React.Component {
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
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td><Button color="primary" href="/add-inventory">Edit</Button> {' '}
            <Button color="danger">Delete</Button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td><Button color="primary" href="/add-inventory">Edit</Button> {' '}
            <Button color="danger">Delete</Button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td><Button color="primary" href="/add-inventory">Edit</Button> {' '}
            <Button color="danger">Delete</Button></td>
          </tr>
        </tbody>
      </Table>
      <Button color="primary" href="/add-inventory">Add an Inventory</Button>
      </div>
    );
  }
}