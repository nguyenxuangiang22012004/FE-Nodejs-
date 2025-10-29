import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryFilter from '../components/shopside/CategoryFilter';
import ColorFilter from '../components/shopside/ColorFilter';
import ManufacturerFilter from '../components/shopside/ManufacturerFilter';
import Pagination from '../components/shopside/Pagination';
import PriceFilter from '../components/shopside/PriceFilter';
import ProductCard from '../components/shopside/ProductCard';
import RatingFilter from '../components/shopside/RatingFilter';
import ShippingFilter from '../components/shopside/ShippingFilter';
import SizeFilter from "../components/shopside/SizeFilter";
const ShopSide = () => {
    const [isGridActive, setIsGridActive] = useState(true);

    // Sample product data
    const products = [
        {
            id: 1,
            name: "New Fashion B Nice Elegant",
            category: "Men Clothing",
            price: "$125.00",
            image: "images/product/men/product6.jpg",
            rating: 3.5,
            reviews: 23,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
        },
        {
            id: 2,
            name: "New Dress A Nice Elegant",
            category: "Women Clothing",
            price: "$125.00",
            image: "images/product/women/product5.jpg",
            rating: 3.5,
            reviews: 23,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
        },
        // Add more products as needed
    ];

    const handleQuickLook = () => {
        setShowQuickLook(true);
    };

    const handleAddToCart = () => {
        setShowAddToCart(true);
    };

    const closeModals = () => {
        setShowQuickLook(false);
        setShowAddToCart(false);
    };

    return (
        <div className="app-content">
            {/* Section 1 */}
            <div className="u-s-p-y-90">
                <div className="container">
                    <div className="row">
                        {/* Sidebar Filters */}
                        <div className="col-lg-3 col-md-12">
                            <div className="shop-w-master">
                                <h1 className="shop-w-master__heading u-s-m-b-30">
                                    <i className="fas fa-filter u-s-m-r-8"></i>
                                    <span>FILTERS</span>
                                </h1>
                                
                                <div className="shop-w-master__sidebar">
                                    {/* Category Filter */}
                                    <div className="u-s-m-b-30">
                                        <CategoryFilter />
                                    </div>
                                    
                                    {/* Rating Filter */}
                                    <div className="u-s-m-b-30">
                                        <RatingFilter />
                                    </div>
                                    
                                    {/* Shipping Filter */}
                                    <div className="u-s-m-b-30">
                                        <ShippingFilter />
                                    </div>
                                    
                                    {/* Price Filter */}
                                    <div className="u-s-m-b-30">
                                        <PriceFilter />
                                    </div>
                                    
                                    {/* Manufacturer Filter */}
                                    <div className="u-s-m-b-30">
                                        <ManufacturerFilter />
                                    </div>
                                    
                                    {/* Color Filter */}
                                    <div className="u-s-m-b-30">
                                        <ColorFilter />
                                    </div>
                                    
                                    {/* Size Filter */}
                                    <div className="u-s-m-b-30">
                                        <SizeFilter />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Products Grid */}
                        <div className="col-lg-9 col-md-12">
                            <div className="shop-p">
                                <div className="shop-p__toolbar u-s-m-b-30">
                                    <div className="shop-p__meta-wrap u-s-m-b-60">
                                        <span className="shop-p__meta-text-1">FOUND {products.length} RESULTS</span>
                                        <div className="shop-p__meta-text-2">
                                            <span>Related Searches:</span>
                                            <a className="gl-tag btn--e-brand-shadow" href="#">men's clothing</a>
                                            <a className="gl-tag btn--e-brand-shadow" href="#">mobiles & tablets</a>
                                            <a className="gl-tag btn--e-brand-shadow" href="#">books & audible</a>
                                        </div>
                                    </div>
                                    
                                    <div className="shop-p__tool-style">
                                        <div className="tool-style__group u-s-m-b-8">
                                            <span 
                                                className={`js-shop-grid-target ${isGridActive ? 'is-active' : ''}`}
                                                onClick={() => setIsGridActive(true)}
                                            >
                                                Grid
                                            </span>
                                            <span 
                                                className={`js-shop-list-target ${!isGridActive ? 'is-active' : ''}`}
                                                onClick={() => setIsGridActive(false)}
                                            >
                                                List
                                            </span>
                                        </div>
                                        
                                        <form>
                                            <div className="tool-style__form-wrap">
                                                <div className="u-s-m-b-8">
                                                    <select className="select-box select-box--transparent-b-2">
                                                        <option>Show: 8</option>
                                                        <option selected>Show: 12</option>
                                                        <option>Show: 16</option>
                                                        <option>Show: 28</option>
                                                    </select>
                                                </div>
                                                <div className="u-s-m-b-8">
                                                    <select className="select-box select-box--transparent-b-2">
                                                        <option selected>Sort By: Newest Items</option>
                                                        <option>Sort By: Latest Items</option>
                                                        <option>Sort By: Best Selling</option>
                                                        <option>Sort By: Best Rating</option>
                                                        <option>Sort By: Lowest Price</option>
                                                        <option>Sort By: Highest Price</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                
                                <div className="shop-p__collection">
                                    <div className={`row ${isGridActive ? 'is-grid-active' : ''}`}>
                                        {products.map(product => (
                                            <ProductCard 
                                                key={product.id} 
                                                product={product} 
                                                // onQuickLook={handleQuickLook}
                                                // onAddToCart={handleAddToCart}
                                            />
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Pagination */}
                                <div className="u-s-p-y-60">
                                    <Pagination />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopSide;