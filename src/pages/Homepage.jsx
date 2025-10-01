import React from 'react';
import FeaturedProducts from '../components/homepage/FeaturedProducts';
import Promotions from '../components/homepage/Promotions';
import ColumnProducts from '../components/homepage/ColumnProducts';
import BlogSection from '../components/homepage/BlogSection';
import Testimonials from '../components/homepage/Testimonials';
import Brands from '../components/homepage/Brands';
const Homepage = () => {
  return (
    <>
      {/* Primary Slider */}
      <div className="s-skeleton s-skeleton--h-600 s-skeleton--bg-grey">
        <div className="owl-carousel primary-style-1" id="hero-slider">
          <div className="hero-slide hero-slide--1">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="slider-content slider-content--animation">
                    <span className="content-span-1 u-c-secondary">Latest Update Stock</span>
                    <span className="content-span-2 u-c-secondary">30% Off On Electronics</span>
                    <span className="content-span-3 u-c-secondary">Find electronics on best prices, Also Discover most selling products of electronics</span>
                    <span className="content-span-4 u-c-secondary">Starting At
                      <span className="u-c-brand">$1050.00</span>
                    </span>
                    <a className="shop-now-link btn--e-brand" href="shop-side-version-2.html">SHOP NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-slide hero-slide--2">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="slider-content slider-content--animation">
                    <span className="content-span-1 u-c-white">Find Top Brands</span>
                    <span className="content-span-2 u-c-white">10% Off On Electronics</span>
                    <span className="content-span-3 u-c-white">Find electronics on best prices, Also Discover most selling products of electronics</span>
                    <span className="content-span-4 u-c-white">Starting At
                      <span className="u-c-brand">$380.00</span>
                    </span>
                    <a className="shop-now-link btn--e-brand" href="shop-side-version-2.html">SHOP NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-slide hero-slide--3">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="slider-content slider-content--animation">
                    <span className="content-span-1 u-c-secondary">Find Top Brands</span>
                    <span className="content-span-2 u-c-secondary">10% Off On Electronics</span>
                    <span className="content-span-3 u-c-secondary">Find electronics on best prices, Also Discover most selling products of electronics</span>
                    <span className="content-span-4 u-c-secondary">Starting At
                      <span className="u-c-brand">$550.00</span>
                    </span>
                    <a className="shop-now-link btn--e-brand" href="shop-side-version-2.html">SHOP NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1 - Shop by Deals */}
      <div className="u-s-p-y-60">
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">SHOP BY DEALS</h1>
                  <span className="section__span u-c-silver">BROWSE FAVOURITE DEALS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-5 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--square">
                    <img className="aspect__img collection__img" src="images/collection/coll-1.jpg" alt="" />
                  </div>
                </a>
              </div>
              <div className="col-lg-7 col-md-7 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--1286-890">
                    <img className="aspect__img collection__img" src="images/collection/coll-2.jpg" alt="" />
                  </div>
                </a>
              </div>
              <div className="col-lg-7 col-md-7 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--1286-890">
                    <img className="aspect__img collection__img" src="images/collection/coll-3.jpg" alt="" />
                  </div>
                </a>
              </div>
              <div className="col-lg-5 col-md-5 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--square">
                    <img className="aspect__img collection__img" src="images/collection/coll-4.jpg" alt="" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - Top Trending */}
      <div className="u-s-p-b-60">
        <div className="section__intro u-s-m-b-16">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">TOP TRENDING</h1>
                  <span className="section__span u-c-silver">CHOOSE CATEGORY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="filter-category-container">
                  <div className="filter__category-wrapper">
                    <button className="btn filter__btn filter__btn--style-1 js-checked" type="button" data-filter="*">ALL</button>
                  </div>
                  <div className="filter__category-wrapper">
                    <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".headphone">HEADPHONES</button>
                  </div>
                  <div className="filter__category-wrapper">
                    <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".smartphone">SMARTPHONES</button>
                  </div>
                  <div className="filter__category-wrapper">
                    <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".sportgadget">SPORT GADGETS</button>
                  </div>
                  <div className="filter__category-wrapper">
                    <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".dslr">DSLR</button>
                  </div>
                </div>
                <div className="filter__grid-wrapper u-s-m-t-30">
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item headphone">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="images/product/electronic/product2.jpg" alt="" />
                          </a>
                          <div className="product-o__action-wrap">
                            <ul className="product-o__action-list">
                              <li>
                                <a data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick View">
                                  <i className="fas fa-search-plus"></i>
                                </a>
                              </li>
                              <li>
                                <a data-modal="modal" data-modal-id="#add-to-cart" data-tooltip="tooltip" data-placement="top" title="Add to Cart">
                                  <i className="fas fa-plus-circle"></i>
                                </a>
                              </li>
                              <li>
                                <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist">
                                  <i className="fas fa-heart"></i>
                                </a>
                              </li>
                              <li>
                                <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Email me When the price drops">
                                  <i className="fas fa-envelope"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Electronics</a>
                        </span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Red Wireless Headphone</a>
                        </span>
                        <div className="product-o__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <span className="product-o__review">(23)</span>
                        </div>
                        <span className="product-o__price">$125.00
                          <span className="product-o__discount">$160.00</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item headphone">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="images/product/electronic/product3.jpg" alt="" />
                          </a>
                          <div className="product-o__action-wrap">
                            <ul className="product-o__action-list">
                              <li>
                                <a data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick View">
                                  <i className="fas fa-search-plus"></i>
                                </a>
                              </li>
                              <li>
                                <a data-modal="modal" data-modal-id="#add-to-cart" data-tooltip="tooltip" data-placement="top" title="Add to Cart">
                                  <i className="fas fa-plus-circle"></i>
                                </a>
                              </li>
                              <li>
                                <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist">
                                  <i className="fas fa-heart"></i>
                                </a>
                              </li>
                              <li>
                                <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Email me When the price drops">
                                  <i className="fas fa-envelope"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Electronics</a>
                        </span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Yellow Wireless Headphone</a>
                        </span>
                        <div className="product-o__rating gl-rating-style">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                          <span className="product-o__review">(23)</span>
                        </div>
                        <span className="product-o__price">$125.00
                          <span className="product-o__discount">$160.00</span>
                        </span>
                      </div>
                    </div>

                    {/* More products... */}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="load-more">
                    <button className="btn btn--e-brand" type="button">Load More</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 - Deal of the Day */}
      <div className="u-s-p-b-60">
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">DEAL OF THE DAY</h1>
                  <span className="section__span u-c-silver">BUY DEAL OF THE DAY, HURRY UP! THESE NEW PRODUCTS WILL EXPIRE SOON.</span>
                  <span className="section__span u-c-silver">ADD THESE ON YOUR CART.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 u-s-m-b-30">
                <div className="product-o product-o--radius product-o--hover-off u-h-100">
                  <div className="product-o__wrap">
                    <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                      <img className="aspect__img" src="images/product/electronic/product11.jpg" alt="" />
                    </a>
                    <div className="product-o__special-count-wrap">
                      <div className="countdown countdown--style-special" data-countdown="2020/05/01"></div>
                    </div>
                    <div className="product-o__action-wrap">
                      <ul className="product-o__action-list">
                        <li>
                          <a data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick View">
                            <i className="fas fa-search-plus"></i>
                          </a>
                        </li>
                        <li>
                          <a data-modal="modal" data-modal-id="#add-to-cart" data-tooltip="tooltip" data-placement="top" title="Add to Cart">
                            <i className="fas fa-plus-circle"></i>
                          </a>
                        </li>
                        <li>
                          <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist">
                            <i className="fas fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Email me When the price drops">
                            <i className="fas fa-envelope"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <span className="product-o__category">
                    <a href="shop-side-version-2.html">Electronics</a>
                  </span>
                  <span className="product-o__name">
                    <a href="product-detail.html">DJI Phantom Drone 4k</a>
                  </span>
                  <div className="product-o__rating gl-rating-style">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <span className="product-o__review">(2)</span>
                  </div>
                  <span className="product-o__price">$125.00
                    <span className="product-o__discount">$160.00</span>
                  </span>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 u-s-m-b-30">
                <div className="product-o product-o--radius product-o--hover-off u-h-100">
                  <div className="product-o__wrap">
                    <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                      <img className="aspect__img" src="images/product/electronic/product12.jpg" alt="" />
                    </a>
                    <div className="product-o__special-count-wrap">
                      <div className="countdown countdown--style-special" data-countdown="2020/05/01"></div>
                    </div>
                    <div className="product-o__action-wrap">
                      <ul className="product-o__action-list">
                        <li>
                          <a data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick View">
                            <i className="fas fa-search-plus"></i>
                          </a>
                        </li>
                        <li>
                          <a data-modal="modal" data-modal-id="#add-to-cart" data-tooltip="tooltip" data-placement="top" title="Add to Cart">
                            <i className="fas fa-plus-circle"></i>
                          </a>
                        </li>
                        <li>
                          <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist">
                            <i className="fas fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Email me When the price drops">
                            <i className="fas fa-envelope"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <span className="product-o__category">
                    <a href="shop-side-version-2.html">Electronics</a>
                  </span>
                  <span className="product-o__name">
                    <a href="product-detail.html">DJI Phantom Drone 2k</a>
                  </span>
                  <div className="product-o__rating gl-rating-style">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <span className="product-o__review">(2)</span>
                  </div>
                  <span className="product-o__price">$125.00
                    <span className="product-o__discount">$160.00</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 - New Arrivals */}
      <div className="u-s-p-b-60">
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">NEW ARRIVALS</h1>
                  <span className="section__span u-c-silver">GET UP FOR NEW ARRIVALS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section__content">
          <div className="container">
            <div className="slider-fouc">
              <div className="owl-carousel product-slider" data-item="4">
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="images/product/electronic/product13.jpg" alt="" />
                      </a>
                      <div className="product-o__action-wrap">
                        <ul className="product-o__action-list">
                          <li>
                            <a data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick View">
                              <i className="fas fa-search-plus"></i>
                            </a>
                          </li>
                          <li>
                            <a data-modal="modal" data-modal-id="#add-to-cart" data-tooltip="tooltip" data-placement="top" title="Add to Cart">
                              <i className="fas fa-plus-circle"></i>
                            </a>
                          </li>
                          <li>
                            <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist">
                              <i className="fas fa-heart"></i>
                            </a>
                          </li>
                          <li>
                            <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Email me When the price drops">
                              <i className="fas fa-envelope"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Electronics</a>
                    </span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Nikon DSLR 4K Camera</a>
                    </span>
                    <div className="product-o__rating gl-rating-style">
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <span className="product-o__review">(0)</span>
                    </div>
                    <span className="product-o__price">$125.00
                      <span className="product-o__discount">$160.00</span>
                    </span>
                  </div>
                </div>
                {/* More slider items... */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5 - Global Offers Banner */}
      <div className="banner-bg">
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="banner-bg__countdown">
                  <div className="countdown countdown--style-banner" data-countdown="2020/05/01"></div>
                </div>
                <div className="banner-bg__wrap">
                  <div className="banner-bg__text-1">
                    <span className="u-c-white">Global</span>
                    <span className="u-c-secondary">Offers</span>
                  </div>
                  <div className="banner-bg__text-2">
                    <span className="u-c-secondary">Official Launch</span>
                    <span className="u-c-white">Don't Miss!</span>
                  </div>
                  <span className="banner-bg__text-block banner-bg__text-3 u-c-secondary">
                    Enjoy Free Shipping when you buy 2 items and above!
                  </span>
                  <a className="banner-bg__shop-now btn--e-secondary" href="shop-side-version-2.html">Shop Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 6 - Featured Products */}
      <FeaturedProducts />
      
      {/* Section 7 - Promotions */}
      <Promotions />
      
      {/* Section 8 - Column Products */}
      <ColumnProducts />

      {/* Services Section */}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 u-s-m-b-30">
                <div className="service u-h-100">
                  <div className="service__icon"><i className="fas fa-truck"></i></div>
                  <div className="service__info-wrap">
                    <span className="service__info-text-1">Free Shipping</span>
                    <span className="service__info-text-2">Free shipping on all US order or order above $200</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 u-s-m-b-30">
                <div className="service u-h-100">
                  <div className="service__icon"><i className="fas fa-redo"></i></div>
                  <div className="service__info-wrap">
                    <span className="service__info-text-1">Shop with Confidence</span>
                    <span className="service__info-text-2">Our Protection covers your purchase from click to delivery</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 u-s-m-b-30">
                <div className="service u-h-100">
                  <div className="service__icon"><i className="fas fa-headphones-alt"></i></div>
                  <div className="service__info-wrap">
                    <span className="service__info-text-1">24/7 Help Center</span>
                    <span className="service__info-text-2">Round-the-clock assistance for a smooth shopping experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* Section 10 - Blog Section */}
      <BlogSection />
      
      {/* Section 11 - Testimonials */}
      <Testimonials />
      
      {/* Section 12 - Brands */}
      <Brands />
    </>
  );
};

export default Homepage;
