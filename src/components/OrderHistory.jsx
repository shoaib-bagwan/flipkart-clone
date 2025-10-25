import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

function OrderHistory() {
    const { apiUrl } = useContext(CartContext);
    const email = localStorage.getItem("email");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/order/orders/${email}`);
            setOrders(res.data || []);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCancel = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            const res = await axios.put(`${apiUrl}/api/order/cancel/${orderId}`,{role:"user"});
            alert("Order cancelled successfully!");
            // Refresh the order list after cancelling
            fetchData();
        } catch (e) {
            console.log(e);
            alert("Failed to cancel the order. Try again later.");
        }
    };

    if (loading) return <p className="text-center mt-5">Loading orders...</p>;
    if (!orders.length)
        return <p className="text-center mt-5">You have no past orders.</p>;

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-center">Order History</h3>

            <div className="row g-3">
                {orders.map((order, idx) => (
                    <div key={idx} className="col-12 col-md-6 col-lg-4">
                        <div className="card shadow-sm border-0 rounded-3 h-100">
                            <div className="card-body d-flex flex-column">
                                <h6 className="fw-bold mb-2">Order ID: {order._id}</h6>
                                <p className="mb-1">
                                    Date: {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                                <p className="mb-1">
                                    Total: ₹{order.totalAmount.toLocaleString("en-IN")}
                                </p>
                                <p className="mb-1 fw-bold">Products:</p>
                                <ul className="list-unstyled mb-2 flex-grow-1">
                                    {order.products.map((p, i) => (
                                        <li key={i}>
                                            {p.productName} x {p.quantity} = ₹
                                            {p.totalPrice.toLocaleString("en-IN")}
                                        </li>
                                    ))}
                                </ul>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <span
                                        className={`badge ${order.orderStatus === "Pending"
                                                ? "bg-primary "
                                                : order.orderStatus === "Cancelled by user" ||
                                                    order.orderStatus === "Cancelled by admin"
                                                    ? "bg-danger border border-warning"
                                                    : "bg-success"
                                            }`}
                                    >
                                        {order.orderStatus || "Completed"}
                                    </span>
                                    {order.orderStatus === "Pending" && (
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleCancel(order._id)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderHistory;
