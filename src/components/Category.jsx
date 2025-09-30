import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Category({ category }) {
    const apiUrl = "https://flipkart-backend-1-os6w.onrender.com";
    const [product, setProduct] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/product/category/${category}`);
            setProduct(res.data);
        } catch (e) {
            console.log(e);
            alert("Network Error");
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]); // fetch again if category changes

    return (
        <div className="container-fluid mb-4 border rounded-3 bg-white">
            <h3 className="pt-3">Best Deal's on {category}</h3>
            <div
                className="d-flex overflow-auto gap-5"
                style={{ gap: "10px", whiteSpace: "nowrap", padding: "10px" }}
            >
                {product.map((e, index) => (
                    <Link
                        to={`/id/${e._id}`}
                        key={index}
                        className="card product-card border-0" // remove border
                        style={{ minWidth: "200px", maxWidth: "200px", height: "300px", textDecoration: "none" }}
                    >
                        <img
                            src={e.image}
                            alt={e.pname}
                            className="card-img-top p-1"
                            style={{ height: "200px", objectFit: "contain" }}
                        />
                        <div className="card-body" style={{ overflow: "hidden", padding: "0 10px" }}>
                            <h4
                                className="card-title"
                                style={{
                                    fontSize: "16px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={e.pname}
                            >
                                {e.pname}
                            </h4>
                            <h5
                                className="card-title text-muted"
                                style={{
                                    fontSize: "14px",
                                    height: "60px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={e.description}
                            >
                                {e.description}
                            </h5>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Category;
