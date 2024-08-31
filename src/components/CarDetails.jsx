import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import carData from '../data/cars.json'; // Adjust the path if necessary

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null); // Start with null to handle loading state

    useEffect(() => {
        // Find the selected car in the imported data
        const selectedCar = carData.Cars.find((car) => car.Cid === parseInt(id));
        setCar(selectedCar);
    }, [id]);

    if (!car) return <div>Loading...</div>;

    return (
        <Container style={{ margin: "150px" }}>
            <Card>
                <Card.Body>
                    <Card.Title>{car.NameMMT} {car.Model}</Card.Title>
                    <Card.Text>
                        <strong>CarID:</strong> {car.Cid} <br />
                        <strong>Is Car Expired:</strong> {car.IsCExp} <br />
                        <strong>Model:</strong> {car.Model} <br />
                        <strong>Year:</strong> {car.Yr} <br />
                        <strong>Price:</strong> {car.Prc} {car.Currency} <br />
                        <strong>Province:</strong> {car.Province} <br />
                        <strong>MkID:</strong> {car.MkID} <br />
                        <strong>MdID:</strong> {car.MdID} <br />
                        <strong>BdID:</strong> {car.BdID} <br />
                        <strong>Update:</strong> {car.Upd} <br />
                        <strong>Page Views:</strong> {car.PagesViews} <br />
                        <strong>Down Payment:</strong> {car.DPmt} <br />
                        <strong>Status:</strong> {car.Status} <br />
                        {car.Img300 && <img src={car.Img300} alt={car.Model} style={{ width: '50%', height: 'auto' }} />}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CarDetails;
