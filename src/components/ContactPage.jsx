import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const owners = [
    {
        name: 'Arkar Phyo',
        id: '6520052',
        email: 'u6520052@au.edu',
        image: 'src/assets/arkar.png',
    },
    {
        name: 'Min Thet Naung',
        id: '6530142',
        email: 'u6530142@au.edu',
        image: 'src/assets/minthet.png',
    }
];

const ContactPage = () => {
    const [reviewName, setReviewName] = useState('');
    const [reviewRating, setReviewRating] = useState('');
    const [reviewMessage, setReviewMessage] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            name: reviewName,
            rating: reviewRating,
            message: reviewMessage,
        };
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        savedReviews.push(reviewData);
        localStorage.setItem('reviews', JSON.stringify(savedReviews));
        setReviewName('');
        setReviewRating('');
        setReviewMessage('');
        alert('Review submitted successfully!');
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const contactData = {
            name: contactName,
            email: contactEmail,
            message: contactMessage,
        };
        const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        savedContacts.push(contactData);
        localStorage.setItem('contacts', JSON.stringify(savedContacts));
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        alert('Message sent successfully!');
    };

    return (
        <Container style={{ marginTop: '100px', marginBottom: '100px' }}>
            <Row className="mt-5">
                {owners.map((owner, index) => (
                    <Col md={6} key={index} className="mb-4">
                        <Card className="text-center border-0 shadow-lg rounded-3" style={{ overflow: 'hidden' }}>
                            <Card.Img
                                variant="top"
                                src={owner.image}
                                alt={owner.name}
                                style={{ width: '250px', height: '250px', objectFit: 'cover', margin: '0 auto', filter: 'brightness(70%)' }}
                            />
                            <Card.Body className="bg-light p-4">
                                <Card.Title className="text-dark" style={{ fontSize: '1.5rem' }}>{owner.name}</Card.Title>
                                <Card.Text className="text-muted">
                                    <strong>ID:</strong> {owner.id} <br />
                                    <strong>Email:</strong> <a href={`mailto:${owner.email}`} className="text-primary">{owner.email}</a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="mt-5">
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm rounded-3">
                        <Card.Body>
                            <Card.Title className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Leave a Review</Card.Title>
                            <Form onSubmit={handleReviewSubmit}>
                                <Form.Group controlId="reviewName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={reviewName}
                                        onChange={(e) => setReviewName(e.target.value)}
                                        required
                                        style={{ borderRadius: '0.5rem', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="reviewRating" className="mt-3">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={reviewRating}
                                        onChange={(e) => setReviewRating(e.target.value)}
                                        required
                                        style={{ borderRadius: '0.5rem', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)' }}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="5">5 - Excellent</option>
                                        <option value="4">4 - Good</option>
                                        <option value="3">3 - Average</option>
                                        <option value="2">2 - Poor</option>
                                        <option value="1">1 - Terrible</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="reviewMessage" className="mt-3">
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Write your review here..."
                                        value={reviewMessage}
                                        onChange={(e) => setReviewMessage(e.target.value)}
                                        required
                                        style={{ borderRadius: '0.5rem', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)' }}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-4" style={{ borderRadius: '0.5rem' }}>
                                    Submit Review
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} className="mb-4">
                    <Card className="shadow-sm rounded-3">
                        <Card.Body>
                            <Card.Title className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Contact Us</Card.Title>
                            <Form onSubmit={handleContactSubmit}>
                                <Form.Group controlId="contactName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        required
                                        style={{ borderRadius: '0.5rem', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="contactEmail" className="mt-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        required
                                        style={{ borderRadius: '0.5rem', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="contactMessage" className="mt-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Write your message here..."
                                        value={contactMessage}
                                        onChange={(e) => setContactMessage(e.target.value)}
                                        required
                                        style={{ borderRadius: '0.5rem', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)' }}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-4" style={{ borderRadius: '0.5rem' }}>
                                    Send Message
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactPage;
