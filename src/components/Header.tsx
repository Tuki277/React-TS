import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Api from '../services/Api';
import { ILogout } from '../services/Interface';

const Header = () => {
    
    const history = useNavigate()
    const logoutButton = () => {
        const session = localStorage.getItem("SessionId")
        Api.post<ILogout>('/api/logout', { session: session }).then(res => {
            if (!res.data.Error) {
                localStorage.clear();
                history('/login')
                window.location.reload()
            }
            else {
                alert(res.data.Message)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={ Link } to="/">Home</Nav.Link>
                        <Nav.Link as={ Link } to="/task">Task</Nav.Link>
                        <Nav.Link as={ Link } to="/session">Session</Nav.Link>
                        <Nav.Link as={ Link } to="/redux">Redux Toolkit</Nav.Link>
                        <Button className='float-right' onClick={() => {logoutButton()}} variant="danger" style={{ position: "absolute", right: 10 }}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
