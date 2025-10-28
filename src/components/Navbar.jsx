import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from '../assets/cart.svg';
import More from "../assets/More.svg";
import Profile from "../assets/Profile.svg";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const { count } = useContext(CartContext);
  const [inp, setInput] = useState("");
  const [product, setProduct] = useState([]);
  // const apiUrl = 'http://localhost:8000';
  const apiUrl = 'https://flipkart-backend-2-cup2.onrender.com';
  const UserName = localStorage.getItem("UserName");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/product/product`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
        alert("Network Error");
      }
    };
    fetchData();
  }, []);

  const getResult = () => {
    if (!inp) return;
    const foundByName = product.find(
      (e) => e.pname.toLowerCase() === inp.toLowerCase()
    );
    const foundByPrice = product.find(
      (e) => String(e.price).trim() === inp.trim()
    );

    if (foundByName) navigate(`/name/${foundByName.pname}`);
    else if (foundByPrice) navigate(`/price/${foundByPrice.price}`);
    else alert("No product found");
  };

  const logOut = () => {
    localStorage.removeItem("UserName");
    localStorage.removeItem("Token");
    localStorage.removeItem("mobileNo");
    localStorage.removeItem("address");
    localStorage.removeItem("email");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
            alt="flipkart-img"
            style={{ height: "40px" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          
          <form className="d-flex flex-grow-1 me-2 my-2 my-lg-0" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for Products, Brand and Many more"
              aria-label="Search"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={getResult}
            >
              Search
            </button>
            
          </form>

          <ul className="navbar-nav align-items-lg-center ms-auto">
            <li><Link  className="btn btn-outline-primary" to="/home">Home</Link></li>
            {/* Profile Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle d-flex align-items-center"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={Profile} alt="profile" className="me-2" />
                {UserName || "Profile"}
              </Link>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/register">Register / New User</Link></li>
                <li><Link className="dropdown-item" to="/login">Login</Link></li>
                <li><Link className="dropdown-item" to="/login" onClick={logOut}>Logout</Link></li>
              </ul>
            </li>

            {/* Cart */}
            <li className="nav-item ms-lg-3">
              <Link className="nav-link position-relative d-flex align-items-center" to="/cart">
                <img src={Cart} alt="cart" className="me-1" />
                Cart
                <span className="badge bg-danger ms-1">{count}</span>
              </Link>
            </li>

            {/* More Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link d-flex align-items-center"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={More} alt="more" className="me-2" />
              </Link>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/order-history">My Order History</Link></li>
                <li><Link className="dropdown-item" to="/contact">Contact</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
