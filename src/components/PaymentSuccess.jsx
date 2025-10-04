import { useLocation } from "react-router-dom";

function PaymentSuccess() {
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get("reference");

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 p-md-5 text-center" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="green"
            className="bi bi-check-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l3-3a.75.75 0 1 0-1.06-1.06L7.5 9.44 5.53 7.47a.75.75 0 0 0-1.06 1.06l2.5 2.5z"/>
          </svg>
        </div>
        <h2 className="text-success mb-3">Payment Successful!</h2>
        <p className="text-muted mb-4">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>
        {reference && (
          <div className="alert alert-warning p-2">
            <strong>Reference ID: </strong> {reference}
          </div>
        )}
        <a href="/" className="btn btn-success mt-3 w-100">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default PaymentSuccess;
