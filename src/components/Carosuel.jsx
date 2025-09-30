import c1 from '../assets/Carosule1.webp';
import c2 from '../assets/Carosule2.webp';
import c3 from '../assets/Carosule3.webp';

function Carosuel() {
  return (
    <div id="carouselExampleInterval" className="carousel slide mt-2 container-fluid" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="100">
      <img src={c1} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="100">
      <img src={c2} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="100">
      <img src={c3} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  );
}

export default Carosuel;
