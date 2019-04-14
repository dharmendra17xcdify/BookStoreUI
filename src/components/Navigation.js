import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { Nav, NavItem, NavLink, NavbarBrand, Navbar, Button } from 'reactstrap';


const Navigation = () => {
    const activeStyle = { color: "#F15B2A" };
    return <Navbar color="light" light expand="md">
        <NavbarBrand href="/">The Book Store</NavbarBrand>
        <Nav>
            {/* <NavItem>
                <NavLink href="/about">About</NavLink>
            </NavItem> */}
            <NavItem>
                <NavLink href="/books" activeStyle={activeStyle}>Books</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/authors">Authors</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/inventory">Inventory</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/addbook">New Book</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/addauthor">New Author</NavLink>
            </NavItem>
        </Nav>
    </Navbar>
}

export default Navigation;