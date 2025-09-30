import axios from 'axios';
import { useState } from "react";
import { Link } from 'react-router-dom';
function Register() {
  const apiUrl='http://localhost:8000'
  const [data,setData]=useState({
    username:'',
    email:'',
    password:'',
  })

  const get =(e)=>{
    var name=e.target.name;
    var value=e.target.value;
    setData({...data,[name]:value})
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    try{
      await axios.post(`${apiUrl}/api/auth/register`,data).then(res=>{
        console.log(res)
        alert("Register Successfully")
      }).catch(err=>{
        console.log(err)
      })
    }catch(e){
      console.log(e)
    }
    setData({
    username:'',
    email:'',
    password:'',
    })
  }
  return (
    <div>
      <h1 className="text-center mt-3">Register Form </h1>
        <form onSubmit={submitHandler} className="w-50 mx-auto border product-card rounded-5 p-5 shadow-lg" style={{marginTop:"2%"}}>
          <input type="text" onChange={get} placeholder="Enter UserName" name="username" id="name" className="form-control"/><br />
          <input type="email" onChange={get} placeholder="Enter Email" name="email" id="email" className="form-control"/><br />
          <textarea type="text" onChange={get} placeholder="Enter the Valid Address" name="address" id="address" className="form-control"/><br />
          <input type="password" onChange={get} placeholder="Enter Password" name="password" id="pass" className="form-control"/><br />
          <p className='text-center'> Already have an Account ? <Link to="/login">Login</Link></p>
          <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">Submit</button>
          <button type="reset" className="btn btn-danger">Reset</button>
          </div>
        </form>
    </div>
  )
}

export default Register