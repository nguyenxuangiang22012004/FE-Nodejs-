import React from 'react';

const Brands = () => {
  const brands = ['b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png', 'b6.png'];

  return (
    <div className="u-s-p-b-60">
      <div className="section__content">
        <div className="container">
          <div className="slider-fouc">
            <div className="owl-carousel" id="brand-slider" data-item="5">
              {brands.map((brand, index) => (
                <div key={index} className="brand-slide">
                  <a href="shop-side-version-2.html">
                    <img src={`images/brand/${brand}`} alt={`Brand ${index + 1}`} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;