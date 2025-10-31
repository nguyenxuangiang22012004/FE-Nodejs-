import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductBreadcrumb from "../components/productdetail/ProductBreadcrumb";
import ProductImages from "../components/productdetail/ProductImages";
import ProductInfo from "../components/productdetail/ProductInfo";
import ProductTabs from "../components/productdetail/ProductTabs";
import RelatedProducts from "../components/productdetail/RelatedProducts";
import {getProductDetail} from "../services/NewArrivalService";
const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams(); 
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductDetail(id);
        setProduct(res.data || res); 
      } catch (error) {
        console.error("Failed to fetch product detail:", error);
      } 
    };
    fetchProduct();
  }, [id]);


  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
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