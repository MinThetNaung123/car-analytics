import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light text-dark py-4 mt-5 border-top">
            <Container>
                <Row>
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5 className="fw-bold mb-3">About Car Analytics</h5>
                        <p>Providing the best car analytics and insights to help you make informed decisions.</p>
                    </Col>
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5 className="fw-bold mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-dark text-decoration-none">Dashboard</a></li>
                            <li><a href="/highlighted-cars" className="text-dark text-decoration-none">Highlighted Cars</a></li>
                            <li><a href="/statistics" className="text-dark text-decoration-none">Statistics</a></li>
                            <li><a href="/about" className="text-dark text-decoration-none">About</a></li>
                            <li><a href="/contact" className="text-dark text-decoration-none">Contact Us</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5 className="fw-bold mb-3">Contact Information</h5>
                        <p>Email: <a href="mailto:u6520283@au.edu" className="text-dark text-decoration-none">u6520283@au.edu</a></p>
                        <p>Phone: <a href="tel:+1234567890" className="text-dark text-decoration-none">+123 456 7890</a></p>
                    </Col>
                </Row>
                <div className="text-center mt-4">
                    <p className="mb-0">&copy; 2024 Car Analytics. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
