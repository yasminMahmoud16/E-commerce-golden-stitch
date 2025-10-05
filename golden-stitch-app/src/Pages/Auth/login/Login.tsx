// import  { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik'
// import * as yup from 'yup'

import corner2 from "@/assets/Images/corner2.png"
import NoAccount from "./NoAccount"
import LoginInput from "./LoginInputs"
// import axios from 'axios';
// import { AuthContext } from '../Context/AuthContext';


export default function Login() {
  // const [msg, setMsg] = useState(null);
  // const [succesMsg, setSuccesMsg] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const { setToken } = useContext(AuthContext);
  // const navigate = useNavigate();

  // schema 

  // const validationSchema = yup.object().shape({
  //   email: yup.string().required('Email Is Requried').email('Please Enter Valid Email'),
  //   password: yup.string().required('Password Is Requried').matches(/^[A-z0-9_]{6,30}$/, 'Please Enter Valid Password With (numbers / _ / characters)'),
  //   rePassword: yup.string().required('rePassword Is Requried').oneOf([yup.ref('password')], 'Password Dose not Match'),
  //   phone: yup.string().required('Phone Is Requried').matches(/^01[1205][0-9]{8}$/ ,'Phone Must Be Start With (010/012/011/015) and Contain 8 Numbers '),
  //   name: yup.string().required('Name Is Requried').min(3, 'Not Less Than 3 Characters').max(20, 'Not More Than 20 Characters')
  // });

  // // for cleenCode
  // async function regester(values) {
  //   // remove the msg if user enters new mail
  //   setMsg(null)
  //   setSuccesMsg(null)
  //   setLoading(true)
  
  //   try {
      
  //     const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
  //     console.log(res);
  //     setSuccesMsg(res.data.message)
  //     setToken(res.data.token);
  //     console.log(res.data.token);
      
  //     localStorage.setItem('token',res.data.token )
  //     setTimeout(() => {
  //       navigate('/login')
  //     },1000)
  //   } catch (err) {
  //     console.log(err.response.data.message);
  //     setMsg(err.response.data.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // };




  // const formik = useFormik({

  //   initialValues: {
  //       name:'',
  //       email:'',
  //       password:'',
  //       rePassword:'',
  //       phone: '',
        
  //   },
  //   validationSchema,
  //   onSubmit: regester
  // });
  return <>
    <section className=' min-h-screen flex items-center justify-center bg-radial from-dark-blue-1 via-dark-blue-2 to-dark-blue-nav '>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-6  md:shadow-[0_0_10px_rgba(242,217,153,0.1)]  rounded-4xl my-5 ">
           <div className="col-span-4 flex flex-col items-center justify-center rounded-4xl md:rounded-l-4xl md:rounded-r-none mx-2 md:mx-0  bg-gradient-to-t from-gold-dark  to-gold-light ">
            <LoginInput/>
          </div>
          <div className=" hidden md:block md:relative col-span-2 rounded-tr-4xl  bg-radial from-dark-blue-1 via-dark-blue-2 to-dark-blue-nav ">
            <NoAccount  />
            <div className="absolute -bottom-3 -right-6 z-0">
              <img src={corner2} alt="corner1" className="w-72 z-0"/>
            </div>
          </div>
         
        </div>

      </div>




    </section>
  </>
}


