import axios from "axios";
import { useEffect, useState } from "react";

function DeleteProduct() {
    const [product, setProduct] = useState([]);
    const apiUrl = "https://flipkart-backend-2-cup2.onrender.com"
    // const apiUrl = "http://localhost:8000"

    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/product/product`).then(res => {
                console.log(res.data);
                setProduct(res.data)
            }).catch(err => {
                console.log(err)
                alert("Can't get product Detail's")
            })
        } catch (e) {
            console.log(e)
            alert("Network Issue")
        }
    }

    const DeleteById = async (id) => {
        try {
            const res = await axios.delete(`${apiUrl}/api/product/delete/${id}`).then(res => {

                alert("Product Deleted Successfully")
                fetchData()
            }).catch(err => {
                console.log(err);
                alert("Data not Deleted")
            })
        } catch (e) {
            console.log(e)
            alert("Network error")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (

        <div>
            <div className="container-fluid ">

                <div className="row mt-3">
                    {product.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (product.map((e, index) => {
                        return (
                            <div className="col-md-3 mb-4" key={index}>
                                <div className="card h-100 product-card">
                                    <img
                                        src={e.image}
                                        alt={e.pname}
                                        className="card-img-top px-2 pt-3"
                                        style={{ width: "100%", objectFit: "contain", height: "200px" }}
                                    />
                                    <div className="card-body">
                                        <h4 className="card-text text-center">{e.pname}</h4>
                                        <h5 className="card-text text-center">{e.description}</h5>
                                        <p className="card-text text-center fw-bold">{e.price}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-danger" onClick={() => DeleteById(e._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    )}
                </div>
            </div>

        </div>
    )
}

export default DeleteProduct