import React from 'react';

const FormDetails = (props) => {
    const { details } = props;

    if(!details) {
        return <h3>Confirming order...</h3>
    }

    const { toppings } = props.details;
    const allToppings = toppings.map(ea => ea + ', ')

    return (
        <div className="form-details">
            <h2>Order Confirmed!</h2>
            <h3>{details.name}</h3>
            <p>Size: {details.size}</p>
            <p>Toppings: {allToppings}</p>
            <p>Special Instructions: {details.specialInstructions}</p>
        </div>
    )
}

export default FormDetails;
