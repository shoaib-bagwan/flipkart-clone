import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "./CartContext";

function ProductName() {
  const {AddToCard}=useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const { pname } = useParams();
  const apiUrl = "https://flipkart-backend-2-cup2.onrender.com";
  // const apiUrl = "http://localhost:8000";


  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product/name/${pname}`);
      console.log("Fetched product:", res.data); 
      setSelectedProduct(res.data); 
    } catch (err) {
      console.log(err);
      alert("Can't get product");
    }
  };

 
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product/product`);
      setAllProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchAllProducts();
    window.scrollTo(0,0)
  }, [pname]);

  if (!selectedProduct) return <div class="d-flex justify-content-center m-5 p-5">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>;

  const suggestions = allProducts.filter(
    (product) => selectedProduct && product._id !== selectedProduct._id
  );

  return (
    <div className="container mt-5">
      {/* Selected Product Card */}
      <div className="card h-100 mb-4 shadow">
        <div className="row g-0">
          <div className="col-md-6 d-flex align-items-center justify-content-center p-3 bg-light">
            <img
              src={selectedProduct.image}
              className="img-fluid rounded"
              alt={selectedProduct.pname}
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body d-flex flex-column justify-content-between h-100">
              <div>
                <h3>{selectedProduct.pname}</h3>
                <p className="text-muted">{selectedProduct.description}</p>
                <h4 className="text-primary">₹{selectedProduct.price}</h4>
              </div>
              <button className="btn btn-primary btn-lg mt-3" onClick={()=>AddToCard(selectedProduct)}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions Section */}
      <h4 className="mb-3">You might also like</h4>
      <div className="row">
        {suggestions.map((product) => (
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
                  <div className="btn btn-outline-success w-50">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductName;
