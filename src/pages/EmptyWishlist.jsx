import React from 'react';
import { Link } from 'react-router-dom';

const EmptyWishlist = () => {
  return (
    <>
      {/*====== App Content ======*/}
      <div className="app-content">
        {/*====== Section 1 ======*/}
        <div className="u-s-p-y-60">
          {/*====== Section Content ======*/}
          <div className="section__content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 u-s-m-b-30">
                  <div className="empty">
                    <div className="empty__wrap">
                      <span className="empty__big-text">EMPTY</span>
                      <span className="empty__text-1">No items found on your wishlist.</span>
                      <Link 
                        className="empty__redirect-link btn--e-brand" 
                        to="/shop-side-version-2"
                      >
                        CONTINUE SHOPPING
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*====== End - Section Content ======*/}
        </div>
        {/*====== End - Section 1 ======*/}
      </div>
      {/*====== End - App Content ======*/}
    </>
  );
};

export default EmptyWishlist;