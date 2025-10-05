import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "./CartContext";

function ProductDetails({ apiEndpoint, paramName }) {
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { AddToCard } = useContext(CartContext);
  const params = useParams();
  const apiUrl = "https://flipkart-backend-2-cup2.onrender.com";
  // const apiUrl = "http://localhost:8000";

  const paramValue = params[paramName]; // Get the dynamic param

  // Fetch selected product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}${apiEndpoint}/${paramValue}`);
      if (Array.isArray(res.data)){
        setProduct(res.data);
      } else {
        setProduct([res.data]);
      }
    } catch (err) {
      console.log(err);
      alert("Can't fetch product");
    }
  };

  // Fetch all products for suggestions
  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product/product`);
      setSuggestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (paramValue) {
      fetchProduct();
      fetchSuggestions();
    }
  }, [paramValue, apiEndpoint]);

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  const filteredSuggestions = suggestions.filter((p) => p._id !== product._id);

  console.log('product', product);
  return (
    <div className="container mt-5">
      {/* Main Product Card */}
      {product.map((product) => (
        <div className="card mb-5 shadow-lg rounded-4 border-0" key={product._id}>
          <div className="row g-0">
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-light p-4">
              <img
                src={product.image}
                alt={product.pname}
                className="img-fluid rounded"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body d-flex flex-column justify-content-between h-100 p-4">
                <div>
                  <h2 className="fw-bold">{product.pname}</h2>
                  <p className="text-muted">{product.description}</p>
                  <h3 className="text-primary mt-3">₹{product.price}</h3>
                </div>
                <button
                  className="btn btn-gradient btn-lg mt-4"
                  onClick={() => AddToCard(product)}
                  style={{
                    background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
                    border: "none",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}


      {/* Suggestions */}
      <h4 className="mb-4 fw-bold">You might also like</h4>
      <div className="row g-4">
        {filteredSuggestions.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card h-100 shadow-sm rounded-4 border-0 suggestion-card">
              <img
                src={p.image}
                alt={p.pname}
                className="card-img-top p-3"
                style={{ height: "220px", objectFit: "contain", transition: "transform 0.3s" }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title fw-bold">{p.pname}</h6>
                <p className="text-primary mb-3 fw-semibold">₹{p.price}</p>
                <div className="d-flex gap-2 mt-auto">
                  <Link to={`/id/${p._id}`} className="btn btn-outline-primary flex-fill">
                    View
                  </Link>
                  <button className="btn btn-success flex-fill" onClick={() => AddToCard(p)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          .suggestion-card:hover img {
            transform: scale(1.05);
          }
          .suggestion-card:hover {
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
}

export default ProductDetails;
