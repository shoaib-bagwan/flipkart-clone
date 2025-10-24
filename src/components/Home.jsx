import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "./CartContext";
import Category from "./Category";

function Home() {
  const { AddToCard } = useContext(CartContext);
  const apiUrl = "https://flipkart-backend-2-cup2.onrender.com";
  // const apiUrl = "http://localhost:8000";
  const [product, setProduct] = useState([]);
  const [loading,setLoading]=useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      await axios.get(`${apiUrl}/api/product/product`)
        .then((res) => {
          console.log(res.data);
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("Can't get Products");
        })
    } catch (e) {
      console.log(e);
    } finally {
    setLoading(false);
  }
  };

  const productDetail = (id) => {
    navigate(`/id/${id}`);
  }

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return(
    <div className="d-flex justify-content-center m-5 p-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <Category category="Clothing" />
      <div className="row">
        {product.map((e, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card h-100 product-card d-flex flex-column shadow-sm rounded-4">
              <img
                src={e.image}
                alt={e.pname}
                className="card-img-top p-3"
                style={{
                  width: "100%",
                  objectFit: "contain",
                  height: "200px",
                }}
              />
              <div className="card-body flex-grow-1">
                <h5 className="card-title text-truncate">{e.pname}</h5>
                <p className="card-text text-muted text-truncate">{e.description}</p>
                <p className="fw-bold text-primary">₹ {e.price}</p>
              </div>
              <div className="card-footer bg-white border-0 mt-auto">
                <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                  <button
                    className="btn btn-primary w-100 w-md-auto mb-2 mb-md-0"
                    onClick={() => productDetail(e._id)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-success w-100 w-md-auto"
                    onClick={() => AddToCard(e)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Category category="Kitchen Appliances" />
    </div>
  );
}

export default Home;
