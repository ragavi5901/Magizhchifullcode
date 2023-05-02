import React, { useRef ,useState} from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import login from '../assets/images/network.png'
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [rewardpoints, setRewardpoints] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const signupUserRef = useRef();
  const signupPasswordRef = useRef();
  const signupEmailRef = useRef();
  const signupPhonenoRef = useRef();

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5003/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        phone: phone,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    const {username,password,email,phone,rewardpoints} = inpval;

    if(username === ""){
        alert("user name field is required")
    }else if(password === ""){
      alert ("password field is required")
    }else if(password === ""){
      alert ("password field is required")
    }else if (password.length<5){
      alert("password length greater five")
    }
    else if(email === ""){
        alert("email field is required")
    }else if(!email.includes("@")){
      alert("please enter valid email address")
    }else if(phone === ""){
      alert("please enter your phone number")
    }else if(rewardpoints === ""){
      alert("please enter your phone number")
    }else{
      console.log("added");
        localStorage.setItem("userstore",JSON.stringify([...data,inpval]));
    }

  }; 

  

  const [inpval,setInpval]= useState({
    username:"",
    password:"",
    email:"",
    phone:"",
    rewardpoints:"",

  })
const [data,setData]= useState([]);
  const getdata =(e)=>{
    const{value,name}=e.target;

    setInpval(()=>{
      return{
        ...inpval,
        [name]:value
      }
    })

  }
  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
        
          <Row>
          <Col lg="6" md="6" sm="12"  className="bg-secondary p-5 text-light">
            <h1 className="text-light">Looks like you're new here!</h1>
     <p className="p-5">
      
Sign up with your mobile number to get started
     </p>
     <img src={login}  className="img-fluid" alt="login" />
           
          </Col>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                
                <div className="form__group">
                  <input
                    type="text"
                    name="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="User Name"
                    ref={signupUserRef}
                  />
                </div>
               
                <div className="form__group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    ref={signupEmailRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    ref={signupPasswordRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    name="password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="Password"
                    ref={signupPasswordRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    ref={signupPhonenoRef}
                  />
                </div> 
                <div className="form__group">
                  <input
                    type="text"
                    name="rewardpoints"
                    value={rewardpoints}
                    onChange={(e) => setRewardpoints(e.target.value)}
                    placeholder="Reward Points"
                    
                  />
                </div>
              
                <button type="submit"  className="addTOCart__btn">
                  Sign Up
                </button>
              </form>
              Already have an account? 
              <Link to="/login"> <span style={{color: "blue"}}>Login</span></Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
