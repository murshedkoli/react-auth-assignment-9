import React, { useState } from 'react';
import './RidePage.css'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import rideData from '../../data'
import RideDetails from '../RideDetails/RideDetails';
import MapChart from '../GoogleMap/GoogleChart';

const RidePage = () => {

    const [formData, setFromData] = useState({
        pickFrom: '',
        pickTo: '',
        date: '',
        error: ''
    });

    const [rideDataFiltered, setRideDataFiltered] = useState(false);
    
    const { id } = useParams();

    const handlonChange = (e) => {

        const newBlur = { ...formData };
        newBlur[e.target.name] = e.target.value;

        setFromData(newBlur);
    }

    const submitForm = e => {
        if (formData.pickFrom && formData.pickTo && formData.date) {
            setRideDataFiltered(true);
            const newBlur = { ...formData };
            newBlur.error = '';
            setFromData(newBlur);
        }
        else {
            const newBlur = { ...formData };
            newBlur.error = "please don't blank any field";
            setFromData(newBlur)
        }

        e.preventDefault();
    }

    return (
        <div  style={{height:'100vh'}}>
            <Container >
                <Row>

                <Col sm={4} className="searchbox">
                    {
                        formData.pickFrom && formData.pickTo && formData.date && rideDataFiltered ? <div >

                            <h2 style={{ fontWeight: 'bold', textTransform: 'capitalize', padding: '10px', backgroundColor: 'white', borderRadius: '10px', }}>{formData.pickFrom}</h2>
                            <p>To</p>
                            <h2 style={{ fontWeight: 'bold', textTransform: 'capitalize', padding: '10px', backgroundColor: 'white', borderRadius: '10px', }}>{formData.pickTo}</h2>
                            <p>at: {formData.date}</p>

                            {
                                rideData.filter(ele => ele.id === id).map(object => <RideDetails data={object}> </RideDetails>)
                            }
                        </div> :
                            <form >
                                <label htmlFor="pickFrom">Pick From</label><br />
                                <input onChange={handlonChange} type="text" name="pickFrom" id="" placeholder="Pick up point" />
                                <label htmlFor="date">Select Your Travel Date:</label>
                                <input onChange={handlonChange} type="date" name="date" id="" />

                                <br />
                                <br />
                                <label htmlFor="pickTo">Pick From</label><br />
                                <input onChange={handlonChange} type="text" name="pickTo" placeholder="Pick to point" />
                                <br />
                                <br />
                                {/* <input type="submit" value="Search" /> */}
                                <button onClick={submitForm} >Search</button>
                                <p style={{ textAlign: 'center', color: 'red' }}>{formData.error}</p>

                            </form>
                    }

                </Col>

                <Col sm={8} >

                    {
                            rideDataFiltered &&  <MapChart></MapChart>

                    }
                </Col>

                </Row>
            </Container>
        </div>
    );
};

export default RidePage;