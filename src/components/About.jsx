import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container style={{ marginTop: '100px', marginBottom: '100px' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="border-0 shadow-lg rounded-3">
            <Card.Body>
              <Card.Title className="mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#343a40' }}>
                About Car Analytics
              </Card.Title>
              <Card.Text className="mb-4" style={{ fontSize: '1.1rem', color: '#495057' }}>
                Welcome to the Car Analytics application! This platform helps users analyze car data, including sales figures and fuel efficiency metrics.
              </Card.Text>
              <Card.Text className="mb-4" style={{ fontSize: '1.2rem', color: '#343a40' }}>
                <strong>Technologies Used:</strong>
              </Card.Text>
              <ul className="list-unstyled" style={{ paddingLeft: '0' }}>
                <li className="d-flex align-items-center mb-3" style={{ fontSize: '1.1rem', color: '#007bff' }}>
                  <span className="fw-bold me-3">React:</span>
                  For building the user interface.
                </li>
                <li className="d-flex align-items-center mb-3" style={{ fontSize: '1.1rem', color: '#ff6f00' }}>
                  <span className="fw-bold me-3">Vite:</span>
                  A fast build tool and development server.
                </li>
                <li className="d-flex align-items-center mb-3" style={{ fontSize: '1.1rem', color: '#17a2b8' }}>
                  <span className="fw-bold me-3">React Bootstrap:</span>
                  For responsive, mobile-first front-end development.
                </li>
              </ul>
              <Card.Text style={{ fontSize: '1rem', color: '#495057' }}>
                This application is a work in progress, and we welcome any feedback or suggestions!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
