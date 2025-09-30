import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryGrid({ category }) {
  const apiUrl = "http://localhost:8000";
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product/category/${category}`);
      setProducts(res.data);
    } catch (e) {
      console.log(e);
      alert("Network Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container-fluid mb-4 p-3 rounded">
      <div className="row g-3">
        {/* Left Card: Product Grid */}
        <div className="col-12 col-lg-6 bg-white rounded">
          <h3 className="p-2">Best Deals on {category}</h3>
          <div
            className="p-3"
            style={{
              minHeight: "400px",
              maxHeight: "700px",
              overflowY: "auto",
            }}
          >
            <div className="row g-2">
              {products.map((product, index) => (
                <div key={index} className="col-6 col-sm-4 col-md-6 col-lg-6">
                  <Link
                    to={`/id/${product._id}`}
                    className="card border-1 text-decoration-none h-100 shadow-sm product-card"
                  >
                    <img
                      src={product.image}
                      alt={product.pname}
                      className="card-img-top p-2"
                      style={{ height: "150px", objectFit: "contain" }}
                    />
                    <div className="card-body p-2">
                      <h5
                        className="card-title mb-1"
                        style={{
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={product.pname}
                      >
                        {product.pname}
                      </h5>
                      <p
                        className="card-text text-muted mb-0"
                        style={{
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={product.description}
                      >
                        {product.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Ad */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
          <img
            src="https://rukminim1.flixcart.com/www/2140/1440/promos/26/09/2023/ed27f892-1bc6-462f-805b-953f5add4f6a.jpg?q=60"
            alt=""
            className="img-fluid rounded"
            style={{ objectFit: "cover", width: "100%", maxHeight: "700px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryGrid;
