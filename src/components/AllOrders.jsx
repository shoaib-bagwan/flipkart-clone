import axios from "axios";
import { useEffect, useState } from "react";

function AllOrders() {
  // const apiUrl = "http://localhost:8000";
  const apiUrl = "https://flipkart-backend-2-cup2.onrender.com";
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

  const completeOrder = async (id) => {
    if (!window.confirm("Are You sure you want to mark as complete to this order")) return;
    try {
      const res = await axios.put(`${apiUrl}/api/order/cancel/${id}`, { role: "Completed" });
      console.log(res.data);
      alert("order completed successfully");
      fetchData();
    } catch (err) {
      console.log(err)
    }
  }

  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order")) return;
    try {
      await axios.put(`${apiUrl}/api/order/cancel/${id}`, { role: "admin" });
      alert("Order cancelled successfully");
      fetchData(); // Refresh after deletion
    } catch (err) {
      console.log(err);
      alert("Failed to cancel order");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container mt-4">
      {orders.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

      ) : (
        orders.map((order, index) => (
          <div
            className="card mb-4 p-3 shadow-sm rounded-4"
            key={index}
            style={{ maxWidth: "600px", margin: "auto" }}
          >
            <div className="d-flex justify-content-between">
              <h4 className="card-title">{order.customerName}</h4>
              <h4 className={`badge ${order.orderStatus === "Pending" ?
                "bg-primary"
                : order.orderStatus === "Cancelled by user" ||
                  order.orderStatus === "Cancelled by admin"
                  ? "bg-danger border border-warning"
                  : "bg-success"
                }`}>{order.orderStatus}</h4>
            </div>
            <p className="card-text text-muted">{order.customerEmail}</p>
            <p className="card-text text-muted">{order.customerMobile}</p>
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
              onClick={() => cancelOrder(order._id)}
            >
              Cancel Order
            </button>
            <button
              className="btn btn-success btn-sm mt-3"
              onClick={() => completeOrder(order._id)}
            >
              Complete Order
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AllOrders;
