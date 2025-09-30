// src/pages/NotFound.js
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <h2 className="text-2xl mt-4">Page Not Found</h2>
            <p className="mt-2 text-gray-600">
                Oops! The page you're looking for doesn’t exist.
            </p>
            <Link
                to="/home"
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
                Go Home
            </Link>
        </div>
    );
}

export default NotFound;
