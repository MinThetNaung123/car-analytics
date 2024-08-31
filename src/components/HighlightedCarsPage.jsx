import { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import AppNavbar from './AppNavbar';
import carData from '../data/cars.json'; // Import JSON data directly

const HighlightedCarPage = () => {
    const [highlightedCars, setHighlightedCars] = useState([]);

    useEffect(() => {
        // Use imported data instead of fetching
        const highlighted = carData.Cars.filter(car =>
            localStorage.getItem(`highlighted_${car.Cid}`) === 'true'
        );
        setHighlightedCars(highlighted);
    }, []);

    const removeHighlight = (Cid) => {
        localStorage.removeItem(`highlighted_${Cid}`);
        setHighlightedCars(prevCars => prevCars.filter(car => car.Cid !== Cid));
    };

    return (
        <>
            <AppNavbar onSearch={() => {}} /> {/* Passing an empty function as no search is needed here */}
            <Container style={{ marginTop: '100px' }}>
                <h2 className="mb-4">Highlighted Cars</h2>
                <Row className="g-4">
                    {highlightedCars.length > 0 ? (
                        highlightedCars.map(car => (
                            <Col sm={12} md={6} lg={4} key={car.Cid} className="d-flex align-items-stretch">
                                <Card className="position-relative border-0 shadow-lg rounded-3 bg-light w-100 d-flex flex-column">
                                    {car.Img300 && (
                                        <Link to={`/car/${car.Cid}`} className="text-decoration-none">
                                            <Card.Img
                                                variant="top"
                                                src={car.Img300}
                                                alt={car.Model}
                                                className="img-fluid"
                                                style={{ objectFit: 'cover', height: '200px' }}
                                            />
                                        </Link>
                                    )}
                                    <Button
                                        variant="link"
                                        onClick={() => removeHighlight(car.Cid)}
                                        className="position-absolute top-0 end-0 m-2"
                                        style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '50%' }}
                                    >
                                        <FaHeart size={24} color="red" />
                                    </Button>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>
                                            <Link to={`/car/${car.Cid}`} className="text-decoration-none text-dark">
                                                {car.NameMMT}
                                            </Link>
                                        </Card.Title>
                                        <Card.Text className="mb-4">
                                            <div><strong>Model:</strong> {car.Model}</div>
                                            <div><strong>Year:</strong> {car.Yr}</div>
                                            <div><strong>Price:</strong> {car.Prc} {car.Currency}</div>
                                            <div><strong>Province:</strong> {car.Province}</div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <p>No highlighted cars found.</p>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default HighlightedCarPage;
