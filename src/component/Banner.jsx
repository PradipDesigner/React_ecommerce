import React from 'react';

const Carousel = () => {
  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="3000">
          <img src="images/slide-1.jpg" className="d-block w-100" alt="banner-img" style={{ maxHeight: '600px', objectFit: 'cover' }}/>
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img src="images/slide-2.jpg" className="d-block w-100" alt="banner-img" style={{ maxHeight: '600px', objectFit: 'cover' }}/>
        </div>
        <div className="carousel-item">
          <img src="images/slide-3.jpg" className="d-block w-100" alt="banner-img" style={{ maxHeight: '600px', objectFit: 'cover' }}/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
