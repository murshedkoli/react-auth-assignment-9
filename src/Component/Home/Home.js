import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import rideData from '../../data';
import SingleProduct from '../SingleProduct/SingleProduct';

const Home = () => {

    const car = rideData[0];
    const bike = rideData[4];
    const bus = rideData[7];
    const train = rideData[11];

    return (

        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container>
                <Row>
                    <Col><SingleProduct data={bike} ></SingleProduct></Col>
                    <Col> <SingleProduct data={car} ></SingleProduct></Col>
                    <Col><SingleProduct data={bus} ></SingleProduct></Col>
                    <Col><SingleProduct data={train} ></SingleProduct></Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;