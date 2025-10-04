import React, { useState } from 'react';
import ProductBreadcrumb from '../components/productdetail/ProductBreadcrumb';
import ProductImages from '../components/productdetail/ProductImages';
import ProductInfo from '../components/productdetail/ProductInfo';
import ProductTabs from '../components/productdetail/ProductTabs';
import RelatedProducts from '../components/productdetail/RelatedProducts';

const ProductDetail = () => {
  // Ví dụ dữ liệu sản phẩm tĩnh
  const [product, setProduct] = useState({
    name: 'Nikon Camera',
    price: 599.99,
    discount: 20,
    originalPrice: 749.99,
    reviews: 23,
    stock: 50,
    left: 10,
    description: 'High-quality Nikon DSLR camera with advanced features.',
    wishlistCount: 150,
    priceDropCount: 30,
  });

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <>
      <div className="u-s-p-t-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <ProductBreadcrumb />
              <ProductImages />
            </div>
            <div className="col-lg-7">
              <ProductInfo
                product={product}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </div>
      <ProductTabs />
      <RelatedProducts />
    </>
  );
};

export default ProductDetail;