  import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "./CartContext";
import Category from "./Category";


  function Home() {
    const {AddToCard}=useContext(CartContext);
    const apiUrl = "https://flipkart-backend-1-os6w.onrender.com";
    const [product, setProduct] = useState([]);
   
   
    const navigate=useNavigate();

    const fetchData = async () => {
      try {
        await axios
          .get(`${apiUrl}/api/product/product`)
          .then((res) => {
            console.log(res.data);
            setProduct(res.data);
          })
          .catch((err) => {
            console.log(err);
            alert("Can't get Products");
          });
      } catch (e) {
        console.log(e);
      }
    };


    const productDetail=(id)=>{
      navigate(`/id/${id}`);
    }
    useEffect(() => {
      fetchData();
    }, []);

    return (
      <div className="container-fluid mt-4">
        <Category category="Clothing "/>
        <div className="row">
          {product.map((e, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 product-card d-flex flex-column">
                <img
                  src={e.image}
                  alt={e.pname}
                  className="card-img-top pt-3 px-2"
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    height: "200px",
                  }}
                />
                <div className="card-body flex-grow-1">
                  <h4 className="card-title">{e.pname}</h4>
                  <p className="card-text text-muted">{e.description}</p>
                  <p className="fw-bold text-primary">₹ {e.price}</p>
                </div>
                <div className="card-footer bg-white border-0 mt-auto">
                  <div className="d-flex justify-content-between">
                    <button 
                    className="btn btn-primary"
                    onClick={()=>productDetail(e._id)}
                    >
                      View Detail's
                    </button>
                    <button className="btn btn-success"
                    onClick={()=>AddToCard(e)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <CategoryGrid category="Clothing"/> */}
        {/* <div className="d-flex gap-2">
          <img src="https://rukminim1.flixcart.com/fk-p-flap/900/560/image/03953ec62a6f4125.jpeg?q=60"
           alt=""
           className="img-fluid w-50 h-50"
           />
           <img src="https://rukminim1.flixcart.com/fk-p-flap/900/560/image/5aff08d1c871a27c.jpeg?q=60"
            alt=""
            className="img-fluid w-50 h-50"/>
            </div> */}
        <Category category="Kitchen Appliances"/>
      
      </div>
    );
  }

  export default Home;
