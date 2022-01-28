import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import formSchema from './formSchema';
import * as yup from 'yup';

import Form from './Components/Form';
import FormDetails from './Components/FormDetails';
import HomePage from './Components/HomePage';

const initialFormValues = {
  name: '',
  size: '',
  pepperoni: false,
  sausage: false,
  cheese: false,
  pineapple: false,
  specialInstructions: ''
}

const initialFormErrors = {
  name: '',
  specialInstructions: ''
}

const initialDisabled = true;

const App = () => {
  const [orders, setOrders] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getOrders = () => {
    axios.get('https://reqres.in/api/orders')
      .then(res => {
        setOrders(res.data.data);
      })
      .catch(err => console.error(err));
  }

  const postNewOrder = (newOrder) => {
    axios.post('https://reqres.in/api/orders', newOrder)
      .then(res => {
        setOrders([res.data, ...orders])
      })
      .catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues));
  }

  const onSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size,
      toppings: ['pepperoni', 'sausage', 'cheese', 'pineapple'].filter((ea) => !!formValues[ea]),
      specialInstructions: formValues.specialInstructions.trim(),
    };
    postNewOrder(newOrder);
  }

  const onChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  }

  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="App">
      <nav>
        <Link to="/" id="order-pizza">Home</Link>
        <Link to="/pizza" id="pizza-form">Order Pizza</Link>
      </nav>
      
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/pizza">
        <Form
          formValues={formValues}
          change={onChange}
          submit={onSubmit}
          errors={formErrors}
          disabled={disabled}
        />
        {
          orders.map(ea => <FormDetails key={ea.id} details={ea} toppings={ea.toppings} />)
        }
      </Route>
    </div>
  );
};
export default App;
