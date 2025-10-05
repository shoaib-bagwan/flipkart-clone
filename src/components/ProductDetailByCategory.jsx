import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "./CartContext";

function ProductDetailByCategory() {
  const {AddToCard}=useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const { category } = useParams();
  const apiUrl = "https://flipkart-backend-2-cup2.onrender.com";
  // const apiUrl = "http://localhost:8000";

  // Fetch selected product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product/category/${category}`);
      setSelectedProduct(res.data);
    } catch (err) {
      console.log(err);
      alert("Can't get product");
    }
  };

  // Fetch all products
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
  }, [category]);

  if (!selectedProduct) return <p className="text-center mt-5">Loading...</p>;

  // Filter out the selected product for suggestions
  const suggestions = allProducts.filter((product) => product.category === category);

  return (
    <div className="container mt-5">

      {/* Suggestions Section */}
      <h4 className="mb-3">Showing Result for {category} </h4>
      <div className="row">
        {suggestions.map((product) => (
          <div className="col-md-4 mb-3" key={product._id}>
            <div className="card h-100 shadow-sm product-card">
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
                  className="btn btn-outline-primary w-50 "
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

export default ProductDetailByCategory;
