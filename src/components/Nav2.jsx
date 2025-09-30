import { Link } from 'react-router-dom';
import Tv from '../assets/Tv.webp';

function Nav2() {
  const categories = [
    { name: "Minutes", img: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/3dbe4c89fbf0003d.png?q=100", link: null },
    { name: "Tablet", img: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/cd6aca4f61e8ea95.png?q=100", link: "/category/Mobiles" },
    { name: "TV", img: Tv, link: "/category/Televisions" },
    { name: "Flights", img: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/d9eea6cd0e7b68bb.png?q=100", link: null },
    { name: "Toys", img: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/3d7144345bbcf2e4.png?q=100", link: null },
    { name: "Grocery", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/2ebb95ec20eae8f1.png?q=100", link: null },
    { name: "Fashion", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/ec2982e5564fe07c.png?q=100", link: "/category/Clothing" },
    { name: "Laptops", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/4d6b13d5a0e0724a.png?q=100", link: "/category/Laptops" },
    { name: "Kitchen", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/febcb9896245caf4.png?q=100", link: "/category/Kitchen Appliances" },
    { name: "Furniture", img: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/cddd92e134ba3ea9.png?q=100", link: "/category/Furniture" },
  ];

  return (
    <div className="mx-3 mt-3 bg-white py-2 px-2">
      {/* Small & medium: scrollable, Large: justify-between */}
      <div className="d-flex flex-nowrap overflow-auto flex-lg-row justify-content-lg-between px-5" >
        {categories.map((cat, index) => (
          <div
            key={index}
            className="text-center flex-shrink-0 me-3 me-lg-0"
            style={{ width: "60px", cursor: "pointer" }}
          >
            {cat.link ? (
              <Link to={cat.link} className="text-decoration-none text-dark d-block">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="img-fluid mb-1"
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
                <small className="fw-bold d-block text-truncate">{cat.name}</small>
              </Link>
            ) : (
              <>
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="img-fluid mb-1"
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
                <small className="fw-bold d-block text-truncate">{cat.name}</small>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nav2;
