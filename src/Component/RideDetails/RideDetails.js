import React from 'react';
import './RideDetails.css'

const RideDetails = (props) => {

        const {id, icon, price, category} = props.data;

    return (
        <div className="ride">
            <img style={{width:'50px'}} src={icon} alt=""/> 
            <p>{id}</p>
            <p>Seat: {category}</p>
            <p>${price}</p>
        </div>
    );
};

export default RideDetails;