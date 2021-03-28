import React, { useContext } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css'


const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const logOut=()=>{
        setLoggedInUser({});
    }

    return (


        <Container>
            <Navbar className="navbar"  variant="light">
                <Link to="/"><Navbar.Brand><h1>Koli Rides</h1></Navbar.Brand></Link>
                <Nav className="mr-auto"></Nav>
                <Form inline>
                    <Nav.Link ><Link to="/home">Home</Link></Nav.Link>
                    <Nav.Link >Destination</Nav.Link>
                    <Nav.Link >Blog</Nav.Link>
                    <Nav.Link >Contact</Nav.Link>
                    {
                       loggedInUser.email && <Nav.Link > <span>Welcome, <Link to ="/login">{loggedInUser.displayName}</Link></span></Nav.Link>
                    }
                    {
                         loggedInUser.email? <Link ><Button onClick={logOut} variant="danger">Logout</Button></Link>:
                         <Link to="/login"><Button className="loginBtn" variant="success">Login</Button></Link>
                    }
                </Form>
            </Navbar>
          
        </Container>

    );
};

export default Header;
