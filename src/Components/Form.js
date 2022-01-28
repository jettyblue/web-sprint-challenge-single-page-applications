import React from 'react';

const Form = (props) => {
    const { formValues, change, submit, disabled, errors } = props;

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

    return (
        <div id="pizza-form">
            <h1> Lambda Eats Pizza Order Form</h1>
            <p>
                {errors.name}
                {errors.size}
                {errors.special}
            </p>
            <form id="pizza-form" onSubmit={onSubmit}>
                <label> Name
                    <input
                        id='name-input'
                        name='name'
                        type='text'
                        value={formValues.name}
                        onChange={onChange}
                    />
                </label>

                <label>
                    <select
                        id='size-dropdown'
                        name='size'
                        value={formValues.size}
                        onChange={onChange}
                    >
                        <option value=''>--Select a size--</option>
                        <option value='personal'>Personal</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                    </select>
                </label>

                <div className="topping-selection">
                    <h3>Toppings</h3>
                    <label> Pepperoni
                        <input
                            name='pepperoni'
                            type='checkbox'
                            checked={formValues.pepperoni}
                            onChange={onChange}
                        />
                    </label>
                    <label> Sausage
                        <input
                            name='sausage'
                            type='checkbox'
                            checked={formValues.sausage}
                            onChange={onChange}
                        />
                    </label>
                    <label> Cheese
                        <input
                            name='cheese'
                            type='checkbox'
                            checked={formValues.cheese}
                            onChange={onChange}
                        />
                    </label>
                    <label> Pineapple
                        <input
                            name='pineapple'
                            type='checkbox'
                            checked={formValues.pineapple}
                            onChange={onChange}
                        />
                    </label>
                </div>
                <label> Special Instructions
                    <input
                        id='special-text'
                        name='specialInstructions'
                        type='text'
                        value={formValues.specialInstructions}
                        onChange={onChange}
                        placeholder='Special Instructions'
                    />
                </label>

                <div>
                    <button id='order-button' disabled={disabled}>Add to Order</button>
                </div>
            </form>
        </div>
    )
}


export default Form;
