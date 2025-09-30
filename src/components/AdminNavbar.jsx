import { Link } from 'react-router-dom';

function AdminNavbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-secondary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/admin">
                        <img
                            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
                            alt="flipkart-img"
                        />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ">
                            <li className="nav-item ms-5 ">
                                <Link className="nav-link fw-bold" aria-current="page" to="/allorders">All orders</Link>
                            </li>
                            <li className="nav-item ms-5">
                                <Link className="nav-link fw-bold" to="/add">Add Product</Link>
                            </li>
                            <li className="nav-item ms-5">
                                <Link className="nav-link fw-bold" to="/delete">Delete Product</Link>
                            </li>
                            <li className="nav-item ms-5">
                                <Link className="nav-link fw-bold" aria-disabled="true" to="/update">Update Product</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar