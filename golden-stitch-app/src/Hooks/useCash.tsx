import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from 'yup';
import { CartContext } from "../Context/CartContext";

export default function useCash() {

    // const notify = () => toast('Wow so easy !');
    const { cartId,setNumOfCartItems } = useContext(CartContext);
    const [paymentWay, setPaymentWay] = useState();
        const [errMsg, setErrMsg] = useState(null);
    const [succMsg, setSuccMsg] = useState(null);

const validationSchema = yup.object().shape({
    shippingAddress: yup.object().shape({
        details: yup.string()
            .required('Your Address Details Is Required')
            .min(3, 'Not Less Than 3 Characters')
            .max(100, 'Not More Than 100 Characters'),
        phone: yup.string()
            .required('Phone Is Required')
            .matches(/^01[1205][0-9]{8}$/, 'Phone number is not valid'),
        city: yup.string()
            .required('City Is Required')
    })
});


    const handleSubmit = (values) => {
        if (paymentWay === 'cash') {
            cashMethod(values);
        } else if (paymentWay === 'visa') {
            visaMethod(values);
        }
        console.log(values);
    };

    const cashMethod = async (values) => {

        console.log('cashMethod');
        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, values, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            console.log(res);
            
            if (res.data.status == 'success') {
                setSuccMsg('Order placed successfully!');
                setErrMsg(null)
                setNumOfCartItems(0);
            }
        } catch (err) {
            console.log(err + 'cash methoud');
            setErrMsg('You Aleardy completed Your Orders! ')
            setSuccMsg(null);
            

        }
    }

    const baseUrl = `${window.location.origin}`;

    const visaMethod = async (values) => {
        console.log('visaMethod');
        console.log(window.location.origin);

        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, values, {
                headers: {
                    token: localStorage.getItem('token')
                },
                params: {
                    url: `${baseUrl}/E-commerceApp/#`
                }
            });
            console.log(res);
            window.open(res.data.session.url, '_blank');
        } catch (err) {
            console.log(err + ' err from visa method');
        }
    }

    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: ""
            }
        },
        validationSchema,
        onSubmit: handleSubmit
    });

    return { handleSubmit, formik, paymentWay, setPaymentWay,errMsg,succMsg };
}
