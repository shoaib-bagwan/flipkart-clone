import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

function Cart() {
  const UserName = localStorage.getItem("UserName");
  const email = localStorage.getItem("email");
  const mobileNo = localStorage.getItem("mobileNo");

  const { apiUrl, cart, setCart, setCount, setOrder } = useContext(CartContext);

  const [loading, setLoading] = useState(false); // 🔹 spinner state

  const customerName = UserName;
  const customerEmail = email;
  const customerMobile = mobileNo;

  // Remove item from cart
  const removeData = (index) => {
    const updateCart = [...cart];
    updateCart.splice(index, 1);
    setCart(updateCart);
    setCount(updateCart.length);
  };

  // Update quantity
  const getQuantity = (value, index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = parseInt(value) || 1;
    setCart(updatedCart);
  };

  // Total price
  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + item.price * (isNaN(item.quantity) ? 1 : Number(item.quantity || 1)),
    0
  );

  // PayNow
  const PayNow = async (amount) => {
    setLoading(true); // Start spinner
    try {
      const { data: keyData } = await axios.get(`${apiUrl}/api/product/getkey`);
      const { key } = keyData;
      const { data: orderData } = await axios.post(`${apiUrl}/api/product/payment/process`, {
        amount,
      });
      const { order } = orderData;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "Shoaib Projects",
        description: "RazorPay Integration",
        order_id: order.id,
        callback_url: "http://localhost:5173/paymentSuccess",
        handler: async function (response) {
          console.log("payment Success", response);

          const orderData = {
            customerName,
            customerEmail,
            customerMobile,
            totalAmount: totalPrice,
            products: cart.map((item) => ({
              productName: item.pname,
              quantity: isNaN(item.quantity)
                ? 1
                : Number(item.quantity || 1),
              totalPrice:
                Number(item.price) *
                (isNaN(item.quantity) ? 1 : Number(item.quantity || 1)),
            })),
          };

          try {
            const res = await axios.post(
              `${apiUrl}/api/order/place-order`,
              orderData
            );
            console.log(res.data);
            setOrder(res.data);
            setCart([]);
            setCount(0);
            alert("✅ Payment successful! Order placed.");
            window.location.href = `/paymentSuccess?reference=${response.razorpay_payment_id}`;
          } catch (err) {
            console.log(err);
            alert("Payment done, but order not saved. Please contact support.");
          }
        },
        prefill: {
          name: customerName || "Customer",
          email: customerEmail || "customer@example.com",
          contact: customerMobile || "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

      // Handle payment failure
      rzp.on("payment.failed", function (response) {
        console.log("Payment Failed:", response.error);
        alert("❌ Payment failed. Please try again.");
      });
    } catch (e) {
      console.error("Payment initiation failed:", e);
      alert("Something went wrong while starting payment.");
    } finally {
      setLoading(false); // Stop spinner when done
    }
  };

  // If user not logged in
  if (!UserName)
    return (
      <div className="d-flex flex-column align-items-center">
        <h2 className="text-center mt-5">Please login to view your cart.</h2>
        <span>
          <Link to="/login" className="btn btn-outline-danger btn-lg">
            Login
          </Link>
        </span>
      </div>
    );

  if (!cart || cart.length === 0)
    return <p className="text-center mt-5">{UserName}, your cart is empty.</p>;

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Your Cart</h4>

      {/* Desktop Table View */}
      <div className="d-none d-md-block table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th style={{ width: "120px" }}>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/id/${item._id}`} className="text-decoration-none">
                    {item.pname}
                  </Link>
                </td>
                <td>₹{Number(item.price).toLocaleString("en-IN")}</td>
                <td>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={item.quantity || 1}
                    min={1}
                    onChange={(e) => getQuantity(e.target.value, index)}
                  />
                </td>
                <td>
                  ₹
                  {Number(item.price * (item.quantity || 1)).toLocaleString(
                    "en-IN"
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeData(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="d-md-none">
        {cart.map((item, index) => (
          <div key={index} className="card mb-3 shadow-sm border-0 rounded-3">
            <div className="card-body">
              <h6>
                <Link
                  to={`/id/${item._id}`}
                  className="text-decoration-none fw-bold"
                >
                  {item.pname}
                </Link>
              </h6>
              <p className="mb-1">
                Price: ₹{Number(item.price).toLocaleString("en-IN")}
              </p>
              <div className="d-flex align-items-center mb-2">
                <label className="me-2">Qty:</label>
                <input
                  type="number"
                  className="form-control form-control-sm text-center"
                  style={{ width: "80px" }}
                  value={item.quantity || 1}
                  min={1}
                  onChange={(e) => getQuantity(e.target.value, index)}
                />
              </div>
              <p className="mb-1">
                Subtotal: ₹
                {Number(item.price * (item.quantity || 1)).toLocaleString(
                  "en-IN"
                )}
              </p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeData(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Buy Now */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 gap-2">
        <h5>Total: ₹{Number(totalPrice).toLocaleString("en-IN")}</h5>

        <button
          className="btn btn-success btn-lg w-sm-auto"
          onClick={() => PayNow(totalPrice)}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
              Processing Payment...
            </>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>
    </div>
  );
}

export default Cart;
