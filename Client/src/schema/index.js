import * as yup from "yup";

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

export const signupSceama=yup.object(
    {
        name:yup.string().min(3).max(15).required("please enter your name"),
        email:yup.string().email("please enter valid email").required("please enter your email"),
        password:yup.string().matches(passwordRegex,"Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character").required("please enter your password"),
        cpassword:yup.string().oneOf([yup.ref("password")],"entered password do not match!").required("please enter conform password")
    }
)

export const PaymentSchema = yup.object({
    cardholderName: yup.string()
        .required("Cardholder name is required")
        .matches(/^[A-Za-z ]+$/, "Invalid cardholder name"),
    cardNumber: yup.string()
        .required("Card number is required")
        .matches(/^\d{16}$/, "Card number must be 16 digits"),
    expiryDate: yup.string()
        .required("Expiry date is required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
    cvv: yup.string()
        .required("CVV is required")
        .matches(/^\d{3}$/, "CVV must be 3 digits"),
});

export const ContactSchema= yup.object({
    name:yup.string().max(3).max(15).required("please enter your name"),
    email:yup.string().email("please enter valid email").required("please enter your email"),
    message:yup.string().max(1).max(250).required("enter your message")
})

export const ProductAddSchema=yup.object({
    shoe_name:yup.string().min(3).max(25).required("please enter Shoes Name"),
    brand_name:yup.string().min(3).max(9).required("please enter Brand Name"),
    category:yup.string().min(3).max(8).required("please enter Category Name"),
    type:yup.string().min(3).max(15).required("please enter type Name"),
    amount:yup.number().min(1).required("please enter amount"),
    shoe_image:yup.string().min(1).required("please enter image url")
})