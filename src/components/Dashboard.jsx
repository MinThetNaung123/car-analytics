import { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Container, Pagination, Form, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import AppNavbar from './AppNavbar';
import carsData from '../data/cars.json';  // Importing JSON data

const Dashboard = () => {
    const [carData, setCarData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [visibleItems, setVisibleItems] = useState(30); // State for Load More
    const [selectedBrand, setSelectedBrand] = useState(''); // State for selected brand
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const itemsPerPage = 21;

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        const carsWithHighlight = carsData.Cars.map(car => ({
            ...car,
            highlighted: localStorage.getItem(`highlighted_${car.Cid}`) === 'true'
        }));
        setCarData(carsWithHighlight);
        setFilteredData(carsWithHighlight);
    }, []);

    // Extract unique brands for the dropdown
    const brands = Array.from(new Set(carData.map(car => car.Model.split(' ')[0])));

    // Filter function
    const handleFilter = useCallback((query) => {
        const normalizedQuery = query.replace(/,/g, '').toLowerCase();
        const filtered = carData.filter(car => {
            const normalizedPrice = (car.Prc || '').replace(/,/g, '');
            const matchesQuery = 
                (car.NameMMT || '').toLowerCase().includes(normalizedQuery) ||
                (car.Model || '').toLowerCase().includes(normalizedQuery) ||
                (car.Yr || '').toString().includes(normalizedQuery) ||
                normalizedPrice.includes(normalizedQuery) ||
                (car.Province || '').toLowerCase().includes(normalizedQuery);
            const matchesBrand = selectedBrand ? car.Model.startsWith(selectedBrand) : true;
            return matchesQuery && matchesBrand;
        });
        setFilteredData(filtered);
        setCurrentPage(1);
        setVisibleItems(itemsPerPage); // Reset visible items on filter change
    }, [carData, selectedBrand]);

    useEffect(() => {
        handleFilter(searchQuery); // Apply filter when searchQuery or selectedBrand changes
    }, [searchQuery, selectedBrand, handleFilter]);

    const handleSortChange = (criteria) => {
        const newDirection = sortCriteria === criteria && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortCriteria(criteria);
        setSortDirection(newDirection);
        sortData(criteria, newDirection);
    };

    const sortData = (criteria, direction) => {
        const sortedData = [...filteredData].sort((a, b) => {
            const compare = (a, b) => {
                if (criteria === 'price') {
                    const priceA = parseFloat(a.Prc.replace(/,/g, ''));
                    const priceB = parseFloat(b.Prc.replace(/,/g, ''));
                    return direction === 'asc' ? priceA - priceB : priceB - priceA;
                }
                if (criteria === 'year') return direction === 'asc' ? a.Yr - b.Yr : b.Yr - a.Yr;
                if (criteria === 'name') return direction === 'asc' ? a.NameMMT.localeCompare(b.NameMMT) : b.NameMMT.localeCompare(a.NameMMT);
                if (criteria === 'model') return direction === 'asc' ? a.Model.localeCompare(b.Model) : b.Model.localeCompare(a.Model);
                return 0;
            };
            return compare(a, b);
        });
        setFilteredData(sortedData);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= Math.ceil(filteredData.length / itemsPerPage)) {
            setCurrentPage(page);
            setVisibleItems(page * itemsPerPage); // For non-mobile, set the visible items based on the current page
        }
    };

    const handleLoadMore = () => setVisibleItems(prev => prev + itemsPerPage);

    const toggleHighlight = (Cid) => {
        const updatedCarData = carData.map(car => {
            if (car.Cid === Cid) {
                const updatedHighlightStatus = !car.highlighted;
                localStorage.setItem(`highlighted_${Cid}`, updatedHighlightStatus);
                return { ...car, highlighted: updatedHighlightStatus };
            }
            return car;
        });

        setCarData(updatedCarData);
        setFilteredData(updatedCarData);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = isMobile ? filteredData.slice(0, visibleItems) : filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <>
            <AppNavbar onSearch={handleSearch} />

            <Container style={{ marginTop: '100px' }}>
                <h2 className="mb-4">Car Dashboard</h2>

                <Form.Group controlId="brandSelect" className="my-3">
                    <Form.Label>Filter by Brand:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedBrand}
                        onChange={e => setSelectedBrand(e.target.value)}
                    >
                        <option value="">All Brands</option>
                        {brands.map((brand, index) => (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="sortSelect" className="my-3">
                    <Form.Label>Sort By:</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-primary" id="sortDropdown">
                            {sortCriteria ? `${sortCriteria.charAt(0).toUpperCase() + sortCriteria.slice(1)} (${sortDirection === 'asc' ? 'Ascending' : 'Descending'})` : 'Sort By'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {['name', 'model', 'year', 'price'].map(criteria => (
                                <Dropdown.Item
                                    key={criteria}
                                    onClick={() => handleSortChange(criteria)}
                                >
                                    {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                <Row className="g-4">
                    {currentItems.length ? (
                        currentItems.map(car => (
                            <Col sm={12} md={6} lg={4} key={car.Cid} className="d-flex align-items-stretch position-relative">
                                <Card className="w-100 border-0 shadow-lg overflow-hidden rounded-3 bg-light" style={{ position: 'relative' }}>
                                    <Card.Img variant="top" src={car.Img300} alt={car.Model} className="img-fluid" style={{ objectFit: 'cover', height: '200px' }} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>
                                            <Link to={`/car/${car.Cid}`} className="text-decoration-none text-dark">{car.NameMMT}</Link>
                                        </Card.Title>
                                        <Card.Text className="mb-4">
                                            <div>Model: {car.Model}</div>
                                            <div>Year: {car.Yr}</div>
                                            <div>Price: {car.Prc} {car.Currency}</div>
                                            <div>Province: {car.Province}</div>
                                        </Card.Text>
                                    </Card.Body>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => toggleHighlight(car.Cid)}
                                        className="position-absolute top-0 end-0 m-2 rounded-circle"
                                        style={{ background: 'rgba(255, 255, 255, 0.8)' }}
                                    >
                                        {car.highlighted ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                                    </Button>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                        <p>No cars found.</p>
                    </Col>
                )}
            </Row>

            {isMobile ? (
                currentItems.length < filteredData.length && (
                    <div className="d-flex justify-content-center my-3">
                        <Button onClick={handleLoadMore}>Load More</Button>
                    </div>
                )
            ) : (
                <div className="d-flex justify-content-end my-3">
                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {[...Array(totalPages).keys()].map(number => (
                            <Pagination.Item
                                key={number + 1}
                                active={number + 1 === currentPage}
                                onClick={() => handlePageChange(number + 1)}
                            >
                                {number + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            )}
        </Container>
    </>
);
};

export default Dashboard;
