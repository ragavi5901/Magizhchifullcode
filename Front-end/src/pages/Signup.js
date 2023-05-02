import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
// import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import { registerUser} from "../features/user/userSlice";


const signUpSchema = yup.object({
  firstname:yup.string().required("First name is requied"),
  lastname:yup.string().required("Last name is requied"),
  email:yup.string().email("Email should be valid").required("Email Address is Required"),
  mobile:yup.string().required("Mobile name is requied"),
  password:yup.string().required("Password name is requied"),
});


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5003/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues:{
      firstname:"",
      lastname:"",
      email:"",
      mobile:"",
      password:"",
    },
    validationSchema: signUpSchema,
    onSubmit:(values) => {
      dispatch(registerUser(values));
    },
  })
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container className="login-wrapper  py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" onSubmit={saveUser} className="d-flex flex-column gap-15">
                <CustomInput
                 type="text" 
                 name="firstname" 
                 placeholder="First Name"  
            
                 value={name}
                    onChange={(e) => setName(e.target.value)}
                 onBlur={formik.handleBlur("firstname")}
                /> 
               
                {/* <CustomInput
                 type="text" 
                 name="lastname" 
                 placeholder="Last Name"  
                
                 onChange={formik.handleChange("lastname")}
                 onBlur={formik.handleBlur("lastname")}
                 value={formik.values.lastname}/>
                <div className="error">
                  {
                    formik.touched.lastname && formik.errors.lastname
                  }
                </div> */}
                <CustomInput type="email" name="email" placeholder="Email"   
               
                 onBlur={formik.handleBlur("email")}
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}/>
                
                {/* <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                 
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  value={formik.values.mobile}/>
                 <div className="error">
                   {
                     formik.touched.mobile && formik.errors.mobile
                   }
                 </div> */}
                <CustomInput
                  type="password"
                  name="password"
                  placeholder= "Password"
                  
                 
                 onBlur={formik.handleBlur("password")}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}/>
                
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Confirm Password"
                  
                 
                 onBlur={formik.handleBlur("password")}
                 value={confPassword}
                 onChange={(e) => setConfPassword(e.target.value)}/>
               
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
