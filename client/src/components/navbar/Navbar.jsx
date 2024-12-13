import React from "react";
import { Navbar, Nav } from 'react-bootstrap';

export const Navigation = () => {

    return (
        <>
            <Navbar>
                <Navbar.Collapse>
                    <Nav className="justify-content-end">
                        <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/chore">List</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/register">Register</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/login">Log In</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )

}