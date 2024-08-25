import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import logo from "../assets/logo.jpg";

const AppNavbar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchQuery); // Pass the search query to the parent
        navigate('/'); // Redirect to the dashboard or a search results page
    };

    return (
        <Navbar bg="light" variant="light" expand="lg" fixed="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                    <span style={{ fontWeight: 'bold', color: '#333' }}>ArKar And Min Car Analytics</span>
                    <img src="./assets/carLogo.jpg" alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto me-3">
                        <Nav.Link as={Link} to="/" className="text-dark">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/highlighted-cars" className="text-dark">Highlighted Cars</Nav.Link>
                        <Nav.Link as={Link} to="/statistics" className="text-dark">Statistics</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="text-dark">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="text-dark">Contact</Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search by brand, name, year, province"
                            className="me-2 rounded-pill"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ maxWidth: '300px' }}
                        />
                        <Button variant="primary" type="submit" className="rounded-pill">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;
