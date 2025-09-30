import axios from "axios";
import { useEffect, useState } from "react";

function AllOrders() {
  const apiUrl = "https://flipkart-backend-1-os6w.onrender.com";
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/order/admin/orders`);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
      alert("Can't fetch orders");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/order/delete/${id}`);
      alert("Order canceled and deleted");
      fetchData(); // Refresh after deletion
    } catch (err) {
      console.log(err);
      alert("Failed to delete order");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {orders.length === 0 ? (
        <p className="text-center mt-5">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            className="card mb-4 p-3 shadow-sm rounded-4"
            key={index}
            style={{ maxWidth: "600px", margin: "auto" }}
          >
            <h4 className="card-title">{order.customerName}</h4>
            <p className="card-text text-muted">{order.customerEmail}</p>
            <h5>Total: ₹{order.totalAmount}</h5>

            <h6 className="mt-3">Products:</h6>
            <ul className="list-group list-group-flush">
              {order.products.map((p, i) => (
                <li className="list-group-item d-flex justify-content-between" key={i}>
                  <span>
                    <strong>{p.productName}</strong> x {p.quantity}
                  </span>
                  <span>₹{p.totalPrice}</span>
                </li>
              ))}
            </ul>

            <small className="text-muted mt-2 d-block">
              Ordered on {new Date(order.createdAt).toLocaleString()}
            </small>

            <button
              className="btn btn-danger btn-sm mt-3"
              onClick={() => deleteOrder(order._id)}
            >
              Cancel Order
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AllOrders;
