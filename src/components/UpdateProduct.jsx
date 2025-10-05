import axios from "axios";
import { useEffect, useState } from "react";

function UpdateProduct() {
    const apiUrl = "https://flipkart-backend-2-cup2.onrender.com";
    // const apiUrl = "http://localhost:8000";
    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/product/product`);
            setProduct(res.data);
        } catch (e) {
            console.log(e);
            alert("Can't get products");
        }
    };


    const UpdateById = async () => {
        try {
            await axios.put(`${apiUrl}/api/product/update/${selectedProduct._id}`, selectedProduct);
            alert("Updated Successfully");
            setShowModal(false);
            fetchData();
        } catch (e) {
            console.log(e);
            alert("Can't Update Product");
        }
    };


    const openModal = (item) => {
        setSelectedProduct({ ...item }); 
        setShowModal(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                {product.map((e, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                        <div className="card h-100 shadow-sm product-card">
                            <img
                                src={e.image}
                                alt={e.pname}
                                className="card-img-top px-2 pt-3"
                                style={{ width: "100%", objectFit: "contain", height: "200px" }}
                            />
                            <div className="card-body text-center">
                                <h4>{e.pname}</h4>
                                <h6>{e.description}</h6>
                                <p className="fw-bold">₹{e.price}</p>
                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-success" onClick={() => openModal(e)}>
                                    Update Product
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedProduct && (
                <div
                    className="modal show fade d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Product</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={selectedProduct.pname}
                                        onChange={(e) =>
                                            setSelectedProduct({ ...selectedProduct, pname: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={selectedProduct.description}
                                        onChange={(e) =>
                                            setSelectedProduct({ ...selectedProduct, description: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={selectedProduct.price}
                                        onChange={(e) =>
                                            setSelectedProduct({ ...selectedProduct, price: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Image URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={selectedProduct.image}
                                        onChange={(e) =>
                                            setSelectedProduct({ ...selectedProduct, image: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={UpdateById}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateProduct;
