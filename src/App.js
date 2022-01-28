import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import formSchema from './formSchema';
import * as yup from 'yup';

import Form from './Components/Form';
import Pizza from './Components/pizza';
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
  // size: '',
  // pepperoni: '',
  // sausage: '',
  // cheese: '',
  // pineapple: '',
  specialInstructions: ''
}

const initialOrder = [];
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
        setOrders([res.data, ...orders]);
      })
      .catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues));
  }

  const onSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size,
      toppings: [
        'pepperoni',
        'sausage',
        'cheese',
        'pinapple'
      ].filter((toppings) => !!formValues[toppings]),
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
      .catch(err => setFormErrors({ formErrors, [name]: err.errors[0] }))
  }

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues]);

  return (
    <div className="App">
      <header>
      <h1>Lambda Eats</h1>
      <nav>
        <Link to="/" id="order-pizza">Home</Link>
        <Link to="/pizza" id="pizza-form">Order Pizza</Link>
      </nav>
      </header>
      <Route path="/pizza">
        <Form
          formValues={formValues}
          change={onChange}
          submit={onSubmit}
          errors={formErrors}
          disabled={disabled}
        />
      </Route>
      <Route exact path="/">
        <HomePage />
      </Route>
    </div>
  );
};
export default App;
