import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const apiUrl = 'http://localhost:8000'
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const get = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/auth/login`, data).then(res => {
        console.log(res.data)
        localStorage.setItem("UserName",res.data.username);
        localStorage.setItem("email",res.data.email);
        localStorage.setItem("address",res.data.address);
        localStorage.setItem("Token",res.data.token);
        
        navigate('/home')
      }).catch(err=>{
        console.log(err)
        alert("no username found do Register")
      })
    } catch (e) {
      console.log(e)
    }
    setData({
    username: '',
    email: '',
    password: '',
    })
  }
  return (
    <div>
      <div className="container">
        <h1 className="text-center mt-3">Login Form</h1>
        <form onSubmit={submitHandler} className='border rounded-4 p-5 w-50 mx-auto shadow-lg product-card' style={{marginTop:"2%"}}>
          <input type="email" onChange={get} name="email" id="email" placeholder="Enter email" className="form-control" /><br />
          <input type="password" onChange={get} name="password" id="pass" placeholder="Enter password" className="form-control" /><br />
          <p className='text-center'>New user ? <Link to="/new-register">create Account</Link></p>
          <div className="d-flex justify-content-between">
            <input type="submit" className="btn btn-success" value="Submit" />
            <input type="reset" className="btn btn-danger" value="Reset" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login