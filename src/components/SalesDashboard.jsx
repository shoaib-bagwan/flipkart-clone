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
            setCustomer(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchOrder = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/order/admin/orders`);
            const ordersData = res.data;
            console.log(ordersData)
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
    const spinner=() => {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchProduct();
        fetchOrder();
        fetchUser();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 fw-bold">Sales Dashboard</h2>

            {/* Top Cards */}
            <div className="row g-4">
                <div className="col-md-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Available Products</h5>
                        <h3 className="text-primary fw-bold">
                            {productCount || spinner()}
                        </h3>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Total Sales Amount</h5>
                        <h3 className="text-success fw-bold">
                            {totalAmount
                                ? totalAmount.toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                })
                                : "₹0"}
                        </h3>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Total Orders</h5>
                        <h3 className="text-warning fw-bold">{itemSold || spinner()}</h3>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Top Product</h5>
                        <h3 className="text-danger fw-bold">
                            {topProduct.name || spinner()} ({topProduct.qty})
                        </h3>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Total Product Sales</h5>
                        <h3 className="text-primary fw-bold">
                            {orders.length > 0
                                ? orders.reduce((total, o) => total + (o.products?.length || 0), 0)
                                : spinner()}
                        </h3>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Average Products per Order</h5>
                        <h3 className="text-primary fw-bold">
                            {orders.length > 0
                                ? (orders.reduce((total, o) => total + (o.products?.length || 0), 0) / orders.length).toFixed(1)
                                : spinner()}
                        </h3>
                    </div>
                </div>


            </div>
            <div className="row g-4 mt-5">
                <div className="col-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Total Customer</h5>
                        <h3 className="text-info fw-bold">
                            {customer ? customer.length : spinner()}
                        </h3>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Delivered Order</h5>
                        <h3 className="text-success fw-bold">
                            {orders.filter((order) => order.orderStatus === "Completed").length}
                        </h3>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Pending Order</h5>
                        <h3 className="text-danger fw-bold">
                            {orders.filter((order) => order.orderStatus === "Pending").length}
                        </h3>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Order Cancelled by Admin</h5>
                        <h3 className="text-danger fw-bold">
                            {orders.filter((order) => order.orderStatus === "Cancelled by admin").length}
                        </h3>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card shadow-sm text-center p-3 border-0 rounded-4">
                        <h5>Order Cancelled by Customer</h5>
                        <h3 className="text-danger fw-bold">
                            {orders.filter((order) => order.orderStatus === "Cancelled by user").length}
                        </h3>
                    </div>
                </div>

            </div>

            {/* Recent Sales */}
            <div className="card shadow-sm p-3 rounded-4 border-0 mt-4">
                <h5 className="fw-bold mb-3">Recent Sales</h5>
                <table className="table table-hover">
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

                            o.products.map((p, i) => {

                                return (
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
                                )
                            }
                            )

                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default SalesDashboard;
