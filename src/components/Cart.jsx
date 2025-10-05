import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

function Cart() {
  const UserName = localStorage.getItem("UserName");
  const email = localStorage.getItem("email");

  const { apiUrl, cart, setCart, setCount, setOrder } = useContext(CartContext);

  const customerName = UserName;
  const customerEmail = email;

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
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  // PayNow
  const PayNow = async (amount) => {
    try {
      const { data: keyData } = await axios.get(`${apiUrl}/api/product/getkey`);
      const { key } = keyData;
      const { data: orderData } = await axios.post(`${apiUrl}/api/product/payment/process`, {
        amount,
      });
      const { order } = orderData
      
      const options = {
        key, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Shoaib Projects',
        description: 'RazorPay Integration',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: 'http://localhost:5173/paymentSuccess', // full URL
        handler: function (response) {
        // Redirect to your React route
        window.location.href = `/paymentSuccess?reference=${response.razorpay_payment_id}`;
    },
        prefill: {
          name: 'Shoaib',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (e) {
      console.log(e);
    }

  }
  // Place order
  const placeOrder = async () => {
    const orderData = {
      customerName,
      customerEmail,
      totalAmount: totalPrice,
      products: cart.map((item) => ({
        productName: item.pname,
        quantity: item.quantity || 1,
        totalPrice: item.price * item.quantity,
      })),
    };

    try {
      const res = await axios.post(`${apiUrl}/api/order/place-order`, orderData);
      console.log(res.data);
      setOrder(res.data);
      setCart([]);
      setCount(0);
      alert("Order placed successfully!");
    } catch (err) {
      console.log(err);
      alert("Can't place order");
    }
  };

  if (!UserName)
    return (
      <div className="d-flex flex-column align-items-center">
        <h2 className="text-center mt-5">Please login to view your cart.</h2>;
        <span><Link to="/login" className="btn btn-outline-danger btn-lg">Login</Link></span>
      </div>
    );
  if (!cart || cart.length === 0)
    return (
      <p className="text-center mt-5">{UserName}, your cart is empty.</p>
    );

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
                  ₹{Number(item.price * (item.quantity || 1)).toLocaleString(
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
          <div
            key={index}
            className="card mb-3 shadow-sm border-0 rounded-3"
          >
            <div className="card-body">
              <h6>
                <Link
                  to={`/id/${item._id}`}
                  className="text-decoration-none fw-bold"
                >
                  {item.pname}
                </Link>
              </h6>
              <p className="mb-1">Price: ₹{Number(item.price).toLocaleString("en-IN")}</p>
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
                Subtotal: ₹{Number(item.price * (item.quantity || 1)).toLocaleString("en-IN")}
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
        <button className="btn btn-success btn-lg  w-sm-auto" onClick={placeOrder}>
          Buy Now
        </button>
        <button className="btn btn-success btn-lg  w-sm-auto" onClick={() => PayNow(totalPrice)}>
          Pay now
        </button>
      </div>
    </div>
  );
}

export default Cart;
