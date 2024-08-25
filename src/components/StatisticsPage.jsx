import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js components

const StatisticsPage = () => {
    const [data, setData] = useState({
        brands: {},
        models: {},
    });

    useEffect(() => {
        fetch('/src/data/cars.json')
            .then(response => response.json())
            .then(data => {
                const brands = {};
                const models = {};

                data.Cars.forEach(car => {
                    const brand = car.NameMMT.split(' ')[0];
                    const model = car.Model;
                    let price = parseFloat(car.Prc.replace(/,/g, ''));

                    if (isNaN(price)) {
                        price = 0;
                    }

                    if (!brands[brand]) {
                        brands[brand] = { count: 0, value: 0 };
                    }
                    brands[brand].count += 1;
                    brands[brand].value += price;

                    if (!models[brand]) {
                        models[brand] = {};
                    }
                    if (!models[brand][model]) {
                        models[brand][model] = 0;
                    }
                    models[brand][model] += 1;
                });

                setData({
                    brands,
                    models
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Prepare data for charts
    const donutData = {
        labels: Object.keys(data.brands),
        datasets: [{
            data: Object.values(data.brands).map(b => b.value),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderColor: '#fff',
            borderWidth: 1
        }]
    };

    const modelLabels = [...new Set(Object.keys(data.models).reduce((acc, brand) => {
        return [...acc, ...Object.keys(data.models[brand])];
    }, []))];

    const colorPalette = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FFCD56', '#4BC0C0', '#7C4DFF', '#F39C12'
    ];

    const stackedBarData = {
        labels: Object.keys(data.models), // Brand names for x-axis
        datasets: modelLabels.map((model, index) => {
            const dataForModel = Object.keys(data.models).map(brand => data.models[brand][model] || 0);
            return {
                label: model,
                data: dataForModel,
                backgroundColor: colorPalette[index % colorPalette.length],
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1
            };
        })
    };

    return (
        <Container style={{ marginTop: '130px' }}>
            <Row className="mb-4">
                <Col md={12}>
                    <h2>Statistics Overview</h2>
                </Col>
            </Row>

            
            {/* Donut chart for portion of cars by brand */}
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <Card.Title>Cars by Brand</Card.Title>
                            <Doughnut
                                data={donutData}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'top'
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: function(tooltipItem) {
                                                    const label = tooltipItem.label || '';
                                                    const value = tooltipItem.raw || 0;
                                                    return `${label}: ${value.toLocaleString()} Baht`;
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Stacked bar chart for models of a brand */}
            <Row>
                <Col md={12}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <Card.Title>Models of Each Brand</Card.Title>
                            <Bar
                                data={stackedBarData}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'top'
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: function(tooltipItem) {
                                                    const label = tooltipItem.dataset.label || '';
                                                    const value = tooltipItem.raw || 0;
                                                    return `${label}: ${value}`;
                                                }
                                            }
                                        }
                                    },
                                    scales: {
                                        x: {
                                            stacked: true,
                                            title: {
                                                display: true,
                                                text: 'Brand'
                                            }
                                        },
                                        y: {
                                            stacked: true,
                                            title: {
                                                display: true,
                                                text: 'Models'
                                            },
                                            ticks: {
                                                display: false // Hide numerical values
                                            }
                                        }
                                    }
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Table for number of cars and values */}
            <Row className="mb-4">
                <Col md={12}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <Card.Title>Number of Cars and Values by Brands and Models</Card.Title>
                            <Table
                                striped
                                bordered
                                hover
                                responsive="md"
                                className="text-center table-bordered"
                                style={{
                                    borderColor: '#dee2e6',
                                    borderRadius: '0.25rem',
                                    overflow: 'hidden',
                                    boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)'
                                }}
                            >
                                <thead className="table-dark">
                                    <tr>
                                        <th>Brand</th>
                                        <th>Model</th>
                                        <th>Count</th>
                                        <th>Value (Baht)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(data.brands).map(([brand, { count, value }]) => (
                                        <>
                                            <tr key={brand} className="bg-light">
                                                <td rowSpan={Object.keys(data.models[brand] || {}).length + 1}>{brand}</td>
                                                <td>Total</td>
                                                <td>{count}</td>
                                                <td>{value.toFixed(2)}</td>
                                            </tr>
                                            {Object.entries(data.models[brand] || {}).map(([model, modelCount]) => (
                                                <tr key={`${brand}-${model}`}>
                                                    <td>{model}</td>
                                                    <td>{modelCount}</td>
                                                    <td>{((modelCount * value) / count).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default StatisticsPage;
