import axios from "axios"
import { useState } from "react"

function AddProduct() {
    const apiUrl = "https://flipkart-backend-1-os6w.onrender.com"
    const [product, setProduct] = useState({
        pname: '',
        description: '',
        price: '',
        image: '',
    })

    const get = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProduct({ ...product, [name]: value })
    }

    const AddTheProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${apiUrl}/api/product/add`, product).then(res => {
                alert("Product added successfully");
            }).catch(err => {
                alert("product not added")
                console.log(err)
            })
        } catch (error) {
            alert("Network issue")
            console.log(error)
        }

    }
    return (
        <div className="mt-5">
            <form action="" onSubmit={AddTheProduct} className="w-50 m-auto d-flex flex-column gap-3 border border-3 p-3 rounded-4 shadow-lg" style={{ backgroundColor: "rgb(219, 235, 254)" }}>
                <h2 className="text-center">Add Product Detail's</h2>
                <div>
                    <label className="form-label" htmlFor="pname">Product Name :</label>
                    <input type="text" placeholder="Product Name " name="pname" id="pname" className="form-control" onChange={get} />
                </div>
                <div>
                    <label className="form-label" htmlFor="description">Product Description :</label>
                    <input type="text" placeholder="Product Description " name="description" id="description" className="form-control" onChange={get} />
                </div>
                <div>
                    <label className="form-label" htmlFor="price">Product Price :</label>
                    <input type="text" placeholder="Product Price " name="price" id="price" className="form-control" onChange={get} />
                </div>
                <div>
                    <label className="form-label" htmlFor="image">Image url :</label>
                    <input type="text" placeholder="Image Url " name="image" id="image" className="form-control" onChange={get} />
                </div>
                <div className="d-flex justify-content-between ">
                    <button type="submit" className="btn btn-success">Submit</button>
                    <button type="reset" className="btn btn-danger">Reset</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct