import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Section4 from '../components/homepage/Section4';
import Section2 from '../components/homepage/Section2';
import Section5 from '../components/homepage/Section5';
import Section1 from '../components/homepage/Section1';
import Section3 from '../components/homepage/Section3';
import Section6 from '../components/homepage/Section6';
import Section7 from '../components/homepage/Section7';
import Section8 from '../components/homepage/Section8';
import Section9 from '../components/homepage/Section9';
import Section10 from '../components/homepage/Section10';
import Section11 from '../components/homepage/Section11';
import Section12 from '../components/homepage/Section12';
import VoucherSection from '../components/homepage/VoucherSection';
import { useAuthFromCookie } from "../hooks/useAuthFromCookie";
const Homepage = () => {
  // useAuthFromCookie();
  const location = useLocation();

  useEffect(() => {
    // Kiểm tra query parameter reload
    const params = new URLSearchParams(location.search);
    if (params.get('reload') === 'true') {
      // Xóa query parameter và reload trang
      window.history.replaceState({}, document.title, '/');
      window.location.reload();
    }
  }, [location]);
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

      <VoucherSection />

      {/* Section 1 - Shop by Deals */}
      <Section1 />
      
      {/* Section 2 - Top Trending */}
      <Section2 />
      
      {/* Section 3 - Deal of the Day */}
      <Section3 />
      
      {/* Section 4 - New Arrivals */}
      <Section4 />
      
      {/* Section 5 - Global Offers Banner */}
      <Section5 />
      
      {/* Section 6 - Featured Products */}
      <Section6 />
      
      {/* Section 7 - Promotions */}
      <Section7 />
      
      {/* Section 8 - Column Products */}
      <Section8 />
      
      {/* Section 9 - Services */}
      <Section9 />
      
      {/* Section 10 - Blog Section */}
      <Section10 />
      
      {/* Section 11 - Testimonials */}
      <Section11 />
      
      {/* Section 12 - Brands */}
      <Section12 />
    </>
  );
};

export default Homepage;