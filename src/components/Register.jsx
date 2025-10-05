import axios from 'axios';
import { useState } from "react";
import { Link } from 'react-router-dom';

function Register() {
  const apiUrl = 'https://flipkart-backend-2-cup2.onrender.com';
  // const apiUrl = 'http://localhost:8000';
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    mobileNo: '',
  });

  const get = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/auth/register`, data);
      console.log(res.data);
      alert("Register Successfully");
      setData({ username: '', email: '', password: '', address: '', mobileNo: '' });
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  const resetHandler = () => {
    setData({ username: '', email: '', password: '', address: '', mobileNo: '' });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light ">
      <form
        onSubmit={submitHandler}
        className="border rounded-4 p-4 shadow-lg bg-white product-card"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Register</h2>

        <input
          type="text"
          onChange={get}
          placeholder="Enter Username"
          name="username"
          value={data.username}
          className="form-control mb-3"
          required
        />

        <input
          type="email"
          onChange={get}
          placeholder="Enter Email"
          name="email"
          value={data.email}
          className="form-control mb-3"
          required
        />

        <input
          type="tel"
          onChange={get}
          placeholder="Enter Mobile No"
          name="mobileNo"
          value={data.mobileNo}
          className="form-control mb-3"
          required
        />

        <textarea
          onChange={get}
          placeholder="Enter Address"
          name="address"
          value={data.address}
          className="form-control mb-3"
          rows="3"
          required
        />

        <input
          type="password"
          onChange={get}
          placeholder="Enter Password"
          name="password"
          value={data.password}
          className="form-control mb-3"
          required
        />

        <p className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
          <button type="submit" className="btn btn-success w-100 w-sm-auto">
            Submit
          </button>
          <button
            type="button"
            onClick={resetHandler}
            className="btn btn-danger w-100 w-sm-auto"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
