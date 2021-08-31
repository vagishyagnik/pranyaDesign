import * as yup from 'yup';

const productSchema = yup.object().shape({
    productTitle : yup.string().required(),
    imageUrl : yup.string().required(),
    MRP : yup.number().positive().required(),
    sellingPrice : yup.number().positive().required(),
    shippingCharges : yup.number().positive().required(),
    category : yup.string().required(),
    description : yup.string().required(),
    shippingInfo : yup.string().required(),
    returnInfo : yup.string().required(),
    careInstructions : yup.string().required(),
    saleable : yup.string().required(),
    status : yup.string().required(),
    length : yup.number().positive(),
    breadth : yup.number().positive(),
    height : yup.number().positive(),
    color : yup.string(),
    style : yup.string(),
    inStock : yup.string().required()
});

export {productSchema};