import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import data from "../data/cars.json";

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(data.car);

    useEffect(() => {
        fetch('/src/data/cars.json') // Adjust path if necessary
            .then((response) => response.json())
            .then((data) => {
                const selectedCar = data.Cars.find((car) => car.Cid === parseInt(id));
                setCar(selectedCar);
            });
    }, [id]);

    if (!car) return <div>Loading...</div>;

    return (
        <Container style={{ margin: "150px" }}>
            <Card>
                <Card.Body>
                    <Card.Title>{car.NameMMT} {car.Model}</Card.Title>
                    <Card.Text>
                        CarID: {car.Cid} <br />
                        Is Car Expired: {car.IsCExp} <br />
                        Model: {car.Model} <br />
                        Year: {car.Yr} <br />
                        Price: {car.Prc} {car.Currency} <br />
                        Province: {car.Province} <br />
                        MkID: {car.MkID} <br />
                        MdID: {car.MdID} <br />
                        BdID: {car.BdID} <br />
                        Update: {car.Upd} <br />
                        Page Views: {car.PagesViews} <br />
                        Down  Payment: {car.DPmt} <br />
                        Status: {car.Status} <br />
                        {car.Img300 && <img src={car.Img300} alt={car.Model} style={{ width: '50%', height: '50%' }} />}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CarDetails;
