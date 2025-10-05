import React from 'react';

const EmptySearch = () => {
  return (
    <div className="app-content">
      {/* Section 1 */}
      <div className="u-s-p-y-60">
        {/* Section Content */}
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 u-s-m-b-30">
                <div className="empty">
                  <div className="empty__wrap">
                    <span className="empty__big-text">SORRY</span>
                    <span className="empty__text-1">
                      Your search did not match any products. A partial match of your keywords is listed below.
                    </span>
                    <span className="empty__text-2">
                      Related searches:{' '}
                      <a href="shop-side-version-2.html">men's clothing</a>{' '}
                      <a href="shop-side-version-2.html">mobiles & tablets</a>{' '}
                      <a href="shop-side-version-2.html">books & audible</a>
                    </span>
                    <form className="empty__search-form">
                      <label htmlFor="search-label"></label>
                      <input
                        className="input-text input-text--primary-style"
                        type="text"
                        id="search-label"
                        placeholder="Search Keywords"
                      />
                      <button className="btn btn--icon fas fa-search" type="submit"></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End - Section Content */}
      </div>
      {/* End - Section 1 */}
    </div>
  );
};

export default EmptySearch;