import { Link } from 'react-router-dom';
import Tv from '../assets/Tv.webp';

function Nav2() {
  return (
    <div className="mx-3 mt-3 bg-white pt-2 px-5">
      <ul className="d-flex justify-content-around align-items-center list-unstyled m-0 flex-wrap">

        <li className="text-center" style={{ cursor: "pointer" }}>
          <figure>
            <img
              src="https://rukminim1.flixcart.com/fk-p-flap/64/64/image/3dbe4c89fbf0003d.png?q=100"
              alt="Minutes"
              className="img-fluid"
              style={{ maxWidth: "80px", height: "auto", objectFit: "contain" }}
            />
            <figcaption className="fw-bold mt-1 small">Minutes</figcaption>
          </figure>
        </li>

        <li className="text-center" style={{ cursor: "pointer" }}>
          <figure>
            <Link to="/category/Mobiles" className="text-decoration-none text-dark">
              <img
                src="https://rukminim1.flixcart.com/fk-p-flap/64/64/image/cd6aca4f61e8ea95.png?q=100"
                alt="Tablet"
                className="img-fluid"
                style={{ maxWidth: "80px", height: "auto", objectFit: "contain" }}
              />
              <figcaption className="fw-bold mt-1 small">Tablet</figcaption>
            </Link>
          </figure>
        </li>

        <li className="text-center" style={{ cursor: "pointer" }}>
          <figure>
            <Link to="/category/Televisions" className="text-decoration-none text-dark">
              <img
                src={Tv}
                alt="TV"
                className="img-fluid"
                style={{ maxWidth: "80px", height: "auto", objectFit: "contain" }}
              />
              <figcaption className="fw-bold mt-1 small">TV</figcaption>
            </Link>
          </figure>
        </li>

        <li className="text-center" style={{ cursor: "pointer" }}>
          <figure>
            <img
              src="https://rukminim1.flixcart.com/fk-p-flap/64/64/image/d9eea6cd0e7b68bb.png?q=100"
              alt="Flight"
              className="img-fluid"
              style={{ maxWidth: "80px", height: "auto", objectFit: "contain" }}
            />
            <figcaption className="fw-bold mt-1 small">Flights</figcaption>
          </figure>
        </li>

        <li className="text-center" style={{ cursor: "pointer" }}>
          <figure>
            <img
              src="https://rukminim1.flixcart.com/fk-p-flap/64/64/image/3d7144345bbcf2e4.png?q=100"
              alt="Toys"
              className="img-fluid"
              style={{ maxWidth: "80px", height: "auto", objectFit: "contain" }}
            />
            <figcaption className="fw-bold mt-1 small">Toys</figcaption>
          </figure>
        </li>

        <li className="text-center" style={{ cursor: "pointer" }}>
          <figure>
            <img
              src="https://rukminim2.flixcart.com/fk-p-flap/64/64/image/2ebb95ec20eae8f1.png?q=100"
              alt="Grocery"
              className="img-fluid"
              style={{ maxWidth: "80px", height: "auto", objectFit: "contain" }}
            />
            <figcaption className="fw-bold mt-1 small">Grocery</figcaption>
          </figure>
        </li>

        <li className="text-center" style={{ cursor: "pointer" }}>
          <figure>
            <Link to="/category/Clothing" className="text-decoration-none text-dark">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/64/64/image/ec2982e5564fe07c.png?q=100"
                alt="Fashion"
                className="img-fluid"
                style={{ maxWidth: "80px", height: "auto", objectFit: "contain" }}
              />
              <figcaption className="fw-bold mt-1 small">Fashion</figcaption>
            </Link>
          </figure>
        </li>

        <li className="text-center" style={{ cursor: "pointer" }}>
          <figure>
            <Link to="/category/Laptops" className="text-decoration-none text-dark">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/64/64/image/4d6b13d5a0e0724a.png?q=100"
                alt="Laptops"
                className="img-fluid"
                style={{ maxWidth: "80px", height: "auto", objectFit: "contain" }}
              />
              <figcaption className="fw-bold mt-1 small">Laptops</figcaption>
            </Link>
          </figure>
        </li>

        <li className="text-center" style={{ cursor: "pointer" }}>
          <figure>
            <Link to="/category/Kitchen Appliances" className="text-decoration-none text-dark">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/64/64/image/febcb9896245caf4.png?q=100"
                alt="Kitchen"
                className="img-fluid"
                style={{ maxWidth: "80px", height: "auto", objectFit: "contain" }}
              />
              <figcaption className="fw-bold mt-1 small">Kitchen</figcaption>
            </Link>
          </figure>
        </li>

        <li className="text-center" style={{ cursor: "pointer" }}>
          <figure>
            <Link to="/category/Furniture" className="text-decoration-none text-dark">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/64/64/image/cddd92e134ba3ea9.png?q=100"
                alt="furniture"
                className="img-fluid"
                style={{ maxWidth: "80px", height: "auto", objectFit: "contain" }}
              />
              <figcaption className="fw-bold mt-1 small">Furniture</figcaption>
            </Link>
          </figure>
        </li>

      </ul>
    </div>
  );
}

export default Nav2;
