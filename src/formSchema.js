import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required("username is required")
        .min(2, "name must be at least 2 characters"),
    size: yup
        .string()
        .required("size is required"),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    cheese: yup.boolean(),
    pineapple: yup.boolean(),
    specialInstructions: yup
        .string(),
})

export default formSchema;
