import axios from 'axios';
import { useState } from "react";
import { Link } from 'react-router-dom';

function Register() {
  const apiUrl = 'https://flipkart-backend-1-os6w.onrender.com';
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });

  const get = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/auth/register`, data)
        .then(res => {
          console.log(res);
          alert("Register Successfully");
        })
        .catch(err => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
    setData({
      username: '',
      email: '',
      password: '',
      address: ''
    });
  };

  return (
    <div className="container-fluid px-3">
      <h1 className="text-center mt-3">Register Form</h1>

      <form
        onSubmit={submitHandler}
        className="mx-auto border rounded-4 p-3 p-sm-4 shadow-lg bg-white"
        style={{  width: "100%", maxWidth: "500px" }}
      >
        <input
          type="text"
          onChange={get}
          placeholder="Enter UserName"
          name="username"
          value={data.username}
          className="form-control mb-3"
        />

        <input
          type="email"
          onChange={get}
          placeholder="Enter Email"
          name="email"
          value={data.email}
          className="form-control mb-3"
        />

        <textarea
          onChange={get}
          placeholder="Enter the Valid Address"
          name="address"
          value={data.address}
          className="form-control mb-3"
          rows="3"
        />

        <input
          type="password"
          onChange={get}
          placeholder="Enter Password"
          name="password"
          value={data.password}
          className="form-control mb-3"
        />

        <p className="text-center">
          Already have an Account? <Link to="/login">Login</Link>
        </p>

        <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
          <button type="submit" className="btn btn-success w-100 w-sm-auto">Submit</button>
          <button type="reset" className="btn btn-danger w-100 w-sm-auto">Reset</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
