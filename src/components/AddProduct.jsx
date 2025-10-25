import axios from "axios";
import { useState } from "react";

function AddProduct() {
    const apiUrl = "https://flipkart-backend-2-cup2.onrender.com";
    // const apiUrl = "http://localhost:8000"

    const [product, setProduct] = useState({
        pname: "",
        description: "",
        price: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const AddTheProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/api/product/add`, product);
            alert("✅ Product added successfully!");
            setProduct({ pname: "", description: "", price: "", image: "" });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("❌ Failed to add product. Please check your connection.");
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <form
                onSubmit={AddTheProduct}
                className="mx-auto d-flex flex-column gap-3 p-4 border border-5 rounded-4 shadow-sm"
                style={{
                    backgroundColor: "rgb(219, 235, 254)",
                    maxWidth: "500px",
                    width: "90%",
                }}
            >
                <h3 className="text-center fw-bold mb-3">Add Product Details</h3>

                <div className="form-group">
                    <label className="form-label fw-semibold" htmlFor="pname">
                        Product Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        name="pname"
                        id="pname"
                        value={product.pname}
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label fw-semibold" htmlFor="description">
                        Product Description
                    </label>
                    <textarea
                        placeholder="Enter short description"
                        name="description"
                        id="description"
                        rows="3"
                        value={product.description}
                        className="form-control"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label fw-semibold" htmlFor="price">
                        Product Price (₹)
                    </label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        name="price"
                        id="price"
                        value={product.price}
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label fw-semibold" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        type="text"
                        placeholder="Enter image link"
                        name="image"
                        id="image"
                        value={product.image}
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mt-3">
                    <button type="submit" className="btn btn-success w-100 w-sm-auto">
                        Submit
                    </button>
                    <button
                        type="reset"
                        className="btn btn-danger w-100 w-sm-auto"
                        onClick={() =>
                            setProduct({ pname: "", description: "", price: "", image: "" })
                        }
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
