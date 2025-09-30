import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductSlide() {
    const apiUrl = "https://flipkart-backend-1-os6w.onrender.com";
    const [product, setProduct] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/product/product`);
            setProduct(res.data);
        } catch (e) {
            console.log(e);
            alert("Network Error");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container-fluid">
            <div
                className="d-flex overflow-auto"
                style={{ gap: "10px", whiteSpace: "nowrap", padding: "10px" }}
            >
                {product.map((e, index) => (

                    <Link to={`/id/${e._id}`}
                        className="card product-card"
                        key={index}
                        style={{ minWidth: "200px", maxWidth: "200px", height: "300px" ,textDecoration: "none" }}
                    >
                        <img
                            src={e.image}
                            alt={e.pname}
                            className="card-img-top p-3"
                            style={{ height: "200px", objectFit: "contain" }}
                        />
                        <div className="card-body" style={{ overflow: "hidden" }}>
                            <h4
                                className="card-title"
                                style={{
                                    fontSize: "16px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={e.pname} // tooltip on hover
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

export default ProductSlide;
