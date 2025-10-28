import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

function SalesDashboard() {
    const { apiUrl } = useContext(CartContext);
    const [productCount, setProductCount] = useState(0);
    const [topProduct, setTopProduct] = useState({ name: "", qty: 0 });
    const [orders, setOrders] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [itemSold, setItemSold] = useState(0);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/product/product`);
            setProductCount(res.data.length);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/auth/alluser`);
            setCustomer(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchOrder = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/order/admin/orders`);
            const ordersData = res.data;
            setOrders(ordersData);

            const productSales = {};

            ordersData.forEach(order => {
                order.products.forEach(item => {
                    const id = item._id;
                    const name = item.productName;
                    const qty = item.quantity || 0;
                    if (!id) return;

                    if (productSales[id]) {
                        productSales[id].quantity += qty;
                    } else {
                        productSales[id] = { name, quantity: qty };
                    }
                });
            });

            const top = Object.values(productSales).reduce((max, p) =>
                p.quantity > max.quantity ? p : max
            );

            setTopProduct({ name: top.name, qty: top.quantity });
            setItemSold(ordersData.length);
            setTotalAmount(
                ordersData.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
            );
        } catch (e) {
            console.log(e);
        }
    };

    const spinner = () => (
        <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    useEffect(() => {
        fetchProduct();
        fetchOrder();
        fetchUser();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 fw-bold">Sales Dashboard</h2>

            {/* Responsive Metric Cards */}
            <div className="row g-3">
                {[
                    {
                        title: "Available Products",
                        value: productCount || spinner(),
                        color: "primary",
                    },
                    {
                        title: "Total Sales Amount",
                        value: totalAmount
                            ? totalAmount.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                            })
                            : "₹0",
                        color: "success",
                    },
                    {
                        title: "Total Orders",
                        value: itemSold || spinner(),
                        color: "warning",
                    },
                    {
                        title: "Top Product",
                        value: `${topProduct.name || "Loading..."} (${topProduct.qty})`,
                        color: "danger",
                    },
                    {
                        title: "Total Product Sales",
                        value:
                            orders.length > 0
                                ? orders.reduce((t, o) => t + (o.products?.length || 0), 0)
                                : spinner(),
                        color: "info",
                    },
                    {
                        title: "Avg Products per Order",
                        value:
                            orders.length > 0
                                ? (
                                    orders.reduce((t, o) => t + (o.products?.length || 0), 0) /
                                    orders.length
                                ).toFixed(1)
                                : spinner(),
                        color: "secondary",
                    },
                ].map((card, index) => (
                    <div key={index} className="col-6 col-sm-6 col-md-4 col-lg-3">
                        <div className="card shadow-sm text-center p-3 border-0 rounded-4 h-100">
                            <h6 className="fw-semibold">{card.title}</h6>
                            <h4 className={`text-${card.color} fw-bold mt-2`}>
                                {card.value}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Orders Status Section */}
            <div className="row g-3 mt-4">
                <div className="col-6 col-sm-6 col-md-4 col-lg-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4 h-100">
                        <h6>Total Customers</h6>
                        <h4 className="text-info fw-bold">
                            {customer ? customer.length : spinner()}
                        </h4>
                    </div>
                </div>

                <div className="col-6 col-sm-6 col-md-4 col-lg-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4 h-100">
                        <h6>Delivered Orders</h6>
                        <h4 className="text-success fw-bold">
                            {orders.filter(o => o.orderStatus === "Completed").length}
                        </h4>
                    </div>
                </div>

                <div className="col-6 col-sm-6 col-md-4 col-lg-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4 h-100">
                        <h6>Pending Orders</h6>
                        <h4 className="text-warning fw-bold">
                            {orders.filter(o => o.orderStatus === "Pending").length}
                        </h4>
                    </div>
                </div>

                <div className="col-6 col-sm-6 col-md-4 col-lg-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4 h-100">
                        <h6>Cancelled by Admin</h6>
                        <h4 className="text-danger fw-bold">
                            {orders.filter(o => o.orderStatus === "Cancelled by admin").length}
                        </h4>
                    </div>
                </div>

                <div className="col-6 col-sm-6 col-md-4 col-lg-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4 h-100">
                        <h6>Cancelled by Customer</h6>
                        <h4 className="text-danger fw-bold">
                            {orders.filter(o => o.orderStatus === "Cancelled by user").length}
                        </h4>
                    </div>
                </div>
            </div>

            {/* Recent Sales Table */}
            <div className="card shadow-sm p-3 rounded-4 border-0 mt-4">
                <h5 className="fw-bold mb-3 text-center text-md-start">Recent Sales</h5>
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(0, 4).map((o, index) =>
                                o.products.map((p, i) => (
                                    <tr key={`${index}-${i}`}>
                                        <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                        <td>{p.productName}</td>
                                        <td>{p.quantity}</td>
                                        <td>
                                            {p.totalPrice?.toLocaleString("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                            }) || "₹0"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalesDashboard;
