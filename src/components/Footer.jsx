import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-dark text-light pt-5 mt-5">
            <div className="container">

               
                <div className="row mb-4">
                    <div className="col-md-3">
                        <h6 className="fw-bold">ABOUT</h6>
                        <ul className="list-unstyled">
                            <li>Contact Us</li>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Flipkart Stories</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h6 className="fw-bold">HELP</h6>
                        <ul className="list-unstyled">
                            <li>Payments</li>
                            <li>Shipping</li>
                            <li>Cancellation & Returns</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h6 className="fw-bold">POLICY</h6>
                        <ul className="list-unstyled">
                            <li>Return Policy</li>
                            <li>Terms Of Use</li>
                            <li>Security</li>
                            <li>Privacy</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h6 className="fw-bold">SOCIAL</h6>
                        <div className="d-flex gap-3 mt-2">
                            <FaFacebookF size={20} />
                            <FaTwitter size={20} />
                            <FaInstagram size={20} />
                            <FaYoutube size={20} />
                        </div>
                    </div>
                </div>

                <hr className="bg-light" />

            
                <div className="row py-3">
                    <div className="col-md-6">
                        <p className="mb-0">&copy; 2025 Flipkart Clone. All Rights Reserved.</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="mb-0">Powered by React & Bootstrap</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
