// src/pages/NotFound.js
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center px-3">
      <h1 className="display-1 text-danger fw-bold mb-3" style={{ fontSize: '8rem' }}>
        404
      </h1>
      <h2 className="fs-2 fw-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '400px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/home"
        className="btn btn-primary btn-lg shadow-sm"
        style={{ transition: 'all 0.3s', transform: 'translateY(0)' }}
        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'}
        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
