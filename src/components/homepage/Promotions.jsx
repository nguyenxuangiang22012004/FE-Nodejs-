import React from 'react';

const Promotions = () => {
  return (
    <div className="u-s-p-b-60">
      <div className="section__content">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 u-s-m-b-30">
              <a className="promotion" href="shop-side-version-2.html">
                <div className="aspect aspect--bg-grey aspect--square">
                  <img className="aspect__img promotion__img" src="images/promo/promo-img-1.jpg" alt="" />
                </div>
                <div className="promotion__content">
                  <div className="promotion__text-wrap">
                    <div className="promotion__text-1">
                      <span className="u-c-secondary">ACCESSORIES FOR YOUR EVERYDAY</span>
                    </div>
                    <div className="promotion__text-2">
                      <span className="u-c-secondary">GET IN</span>
                      <span className="u-c-brand">TOUCH</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 u-s-m-b-30">
              <a className="promotion" href="shop-side-version-2.html">
                <div className="aspect aspect--bg-grey aspect--square">
                  <img className="aspect__img promotion__img" src="images/promo/promo-img-2.jpg" alt="" />
                </div>
                <div className="promotion__content">
                  <div className="promotion__text-wrap">
                    <div className="promotion__text-1">
                      <span className="u-c-secondary">SMARTPHONE</span>
                      <span className="u-c-brand">2019</span>
                    </div>
                    <div className="promotion__text-2">
                      <span className="u-c-secondary">NEW ARRIVALS</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 u-s-m-b-30">
              <a className="promotion" href="shop-side-version-2.html">
                <div className="aspect aspect--bg-grey aspect--square">
                  <img className="aspect__img promotion__img" src="images/promo/promo-img-3.jpg" alt="" />
                </div>
                <div className="promotion__content">
                  <div className="promotion__text-wrap">
                    <div className="promotion__text-1">
                      <span className="u-c-secondary">DSLR FOR NEW GENERATION</span>
                    </div>
                    <div className="promotion__text-2">
                      <span className="u-c-brand">GET UP TO 10% OFF</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;