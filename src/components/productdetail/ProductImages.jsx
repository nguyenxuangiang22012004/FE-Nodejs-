import React from 'react';

const ProductImages = () => {
  return (
    <div className="pd u-s-m-b-30">
      <div className="slider-fouc pd-wrap">
        <div id="pd-o-initiate">
          <div className="pd-o-img-wrap" data-src="/images/product/product-d-1.jpg">
            <img 
              className="u-img-fluid" 
              src="/images/product/product-d-1.jpg" 
              data-zoom-image="/images/product/product-d-1.jpg" 
              alt="Nikon Camera" 
            />
          </div>
          <div className="pd-o-img-wrap" data-src="/images/product/product-d-2.jpg">
            <img 
              className="u-img-fluid" 
              src="/images/product/product-d-2.jpg" 
              data-zoom-image="/images/product/product-d-2.jpg" 
              alt="Nikon Camera Side View" 
            />
          </div>
          <div className="pd-o-img-wrap" data-src="/images/product/product-d-3.jpg">
            <img 
              className="u-img-fluid" 
              src="/images/product/product-d-3.jpg" 
              data-zoom-image="/images/product/product-d-3.jpg" 
              alt="Nikon Camera Back View" 
            />
          </div>
          <div className="pd-o-img-wrap" data-src="/images/product/product-d-4.jpg">
            <img 
              className="u-img-fluid" 
              src="/images/product/product-d-4.jpg" 
              data-zoom-image="/images/product/product-d-4.jpg" 
              alt="Nikon Camera Lens" 
            />
          </div>
          <div className="pd-o-img-wrap" data-src="/images/product/product-d-5.jpg">
            <img 
              className="u-img-fluid" 
              src="/images/product/product-d-5.jpg" 
              data-zoom-image="/images/product/product-d-5.jpg" 
              alt="Nikon Camera Accessories" 
            />
          </div>
        </div>
        <span className="pd-text">Click for larger zoom</span>
      </div>
      <div className="u-s-m-t-15">
        <div className="slider-fouc">
          <div id="pd-o-thumbnail">
            <div>
              <img 
                className="u-img-fluid" 
                src="/images/product/product-d-1.jpg" 
                data-zoom-image="/images/product/product-d-1.jpg" 
                alt="Thumbnail 1" 
              />
            </div>
            <div>
              <img 
                className="u-img-fluid" 
                src="/images/product/product-d-2.jpg" 
                data-zoom-image="/images/product/product-d-2.jpg" 
                alt="Thumbnail 2" 
              />
            </div>
            <div>
              <img 
                className="u-img-fluid" 
                src="/images/product/product-d-3.jpg" 
                data-zoom-image="/images/product/product-d-3.jpg" 
                alt="Thumbnail 3" 
              />
            </div>
            <div>
              <img 
                className="u-img-fluid" 
                src="/images/product/product-d-4.jpg" 
                data-zoom-image="/images/product/product-d-4.jpg" 
                alt="Thumbnail 4" 
              />
            </div>
            <div>
              <img 
                className="u-img-fluid" 
                src="/images/product/product-d-5.jpg" 
                data-zoom-image="/images/product/product-d-5.jpg" 
                alt="Thumbnail 5" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;