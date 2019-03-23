import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { Nav, NavItem, NavLink, NavbarBrand, Navbar, Button } from 'reactstrap';


const Navigation = () => {
    return <Navbar color="light" light expand="md">
        <NavbarBrand href="/">The Book Store</NavbarBrand>
        <Nav>
            <NavItem>
                <NavLink href="/books">Books</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/authors">Authors</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/inventory">Inventory</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/about">About</NavLink>
            </NavItem>
            <NavItem>
            <Button color="primary" href="/addbook">Add a Book</Button> 
            </NavItem>
            <NavItem>
            <Button color="primary" href="/addauthor">Add an Author</Button>
            </NavItem>
        </Nav>
    </Navbar>
}

export default Navigation;