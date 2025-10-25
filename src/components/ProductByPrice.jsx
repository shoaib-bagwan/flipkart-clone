import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "./CartContext";

function ProductByPrice() {
  const {AddToCard}=useContext(CartContext);
  const { price } = useParams(); // Get price from URL
  const [products, setProducts] = useState([]);
  const apiUrl = "https://flipkart-backend-2-cup2.onrender.com";
  // const apiUrl = "http://localhost:8000";

  // Fetch products by price
  const fetchProductsByPrice = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product/price/${price}`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      alert("Can't fetch products");
    }
  };

  useEffect(() => {
    fetchProductsByPrice();
    window.scrollTo(0,0);
  }, [price]);

  if (!products || products.length === 0)
    return <div class="d-flex justify-content-center m-5 p-5">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>;

  return (
    <div className="container mt-5">
      <h4 className="mb-3">Products with price ₹{price}</h4>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={product._id}>
            <div className="card h-100 shadow-lg p-3 product-card">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.pname}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{product.pname}</h6>
                <p className="text-primary mb-2">₹{product.price}</p>
                <div className="d-flex justify-content-between">
                  <Link
                    to={`/id/${product._id}`}
                    className="btn btn-outline-primary w-50"
                  >
                    View
                  </Link>
                  <div className="btn btn-outline-success w-50" onClick={()=>AddToCard(product)}>Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductByPrice;
