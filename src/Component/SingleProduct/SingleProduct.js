import React from 'react';
import { Card } from 'react-bootstrap';
import './SingleProduct.css'
import {
 
    Link
  } from "react-router-dom";

const SingleProduct = (props) => {

    const data = props.data;
    

    return (
        <div>
            
                 
            <Link to={`/ridepage${data.id}`}>
            
            <Card className="card" style={{ width: '15rem', padding: '10px' }}>
                        <Card.Img  src={data.icon} />
                        <Card.Body>
                            <Card.Title className ="title">{data.id}</Card.Title>
                            
                        </Card.Body>
                    </Card>
            
            </Link>
           
            
        </div>
    );
};

export default SingleProduct;