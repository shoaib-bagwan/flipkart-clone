import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const apiUrl = 'https://flipkart-backend-2-cup2.onrender.com';
  // const apiUrl = 'http://localhost:8000';
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const get = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/auth/login`, data)
        .then(res => {
          console.log(res.data);
          localStorage.setItem("UserName", res.data.username);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("address", res.data.address);
          localStorage.setItem("Token", res.data.token);
          if(res.data.role==='admin'){
            navigate('/admin');
          }else{
            navigate('/home');
          }
        })
        .catch(err => {
          console.log(err);
          alert("No username found. Please Register.");
        });
    } catch (e) {
      console.log(e);
    }
    setData({ email: '', password: '' });
  }

  return (
    <div className="container bg-light">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div className="card shadow-lg rounded-4 p-4 product-card">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <input
                  type="email"
                  onChange={get}
                  name="email"
                  id="email"
                  value={data.email}
                  placeholder="Enter email"
                  className="form-control "
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  onChange={get}
                  name="password"
                  id="pass"
                  value={data.password}
                  placeholder="Enter password"
                  className="form-control"
                  required
                />
              </div>
              <p className='text-center'>
                New user? <Link to="/new-register">Create Account</Link>
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                <button type="submit" className="btn btn-success w-100 w-md-auto">Submit</button>
                <button type="reset" className="btn btn-danger w-100 w-md-auto">Reset</button>
              </div>
              <Link to="/home"className="btn btn-outline-dark mt-3">Skip Login</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
