import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PriceFilter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Load giá trị từ URL khi component mount
  useEffect(() => {
    const minFromUrl = searchParams.get("minPrice");
    const maxFromUrl = searchParams.get("maxPrice");
    
    if (minFromUrl) setMinPrice(minFromUrl);
    if (maxFromUrl) setMaxPrice(maxFromUrl);
  }, [searchParams]);

  const handlePriceFilter = (e) => {
    e.preventDefault();
    
    const newParams = new URLSearchParams(searchParams);
    
    const min = minPrice && !isNaN(minPrice) && parseFloat(minPrice) >= 0 ? minPrice : "";
    const max = maxPrice && !isNaN(maxPrice) && parseFloat(maxPrice) >= 0 ? maxPrice : "";
    
    console.log("Min Price:", min);
    console.log("Max Price:", max);
    
    // Chỉ apply filter khi có CẢ min VÀ max (theo yêu cầu của backend)
    if (min && max) {
      // Kiểm tra min phải nhỏ hơn max
      if (parseFloat(min) > parseFloat(max)) {
        alert("Min price phải nhỏ hơn Max price!");
        return;
      }
      newParams.set("minPrice", min);
      newParams.set("maxPrice", max);
    } else {
      // Nếu không có đủ cả hai, xóa cả hai params
      newParams.delete("minPrice");
      newParams.delete("maxPrice");
      alert("Vui lòng nhập cả Min và Max price!");
      return;
    }
    
    // Reset về trang đầu tiên khi apply filter
    newParams.set("offset", 0);
    
    console.log("New URL:", `?${newParams.toString()}`);
    navigate(`?${newParams.toString()}`);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    // Chỉ cho phép số và dấu chấm
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    // Chỉ cho phép số và dấu chấm
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setMaxPrice(value);
    }
  };

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("minPrice");
    newParams.delete("maxPrice");
    newParams.set("offset", 0);
    navigate(`?${newParams.toString()}`);
  };

  return (
    <div className="shop-w shop-w--style">
      <div className="shop-w__intro-wrap">
        <h1 className="shop-w__h">PRICE</h1>
        <span 
          className="fas fa-minus shop-w__toggle" 
          data-target="#s-price" 
          data-toggle="collapse"
        ></span>
      </div>
      
      <div className="shop-w__wrap collapse show" id="s-price">
        <form className="shop-w__form-p" onSubmit={handlePriceFilter}>
          <div className="shop-w__form-p-wrap">
            <div>
              <label htmlFor="price-min"></label>
              <input 
                className="input-text input-text--primary-style" 
                type="text" 
                id="price-min" 
                placeholder="Min" 
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </div>
            <div>
              <label htmlFor="price-max"></label>
              <input 
                className="input-text input-text--primary-style" 
                type="text" 
                id="price-max" 
                placeholder="Max"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
            <div>
              <button 
                className="btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2" 
                type="submit"
                title="Apply filter"
              ></button>
            </div>
          </div>
        </form>
        
        {/* Hiển thị nút clear khi đang có filter */}
        {(minPrice || maxPrice) && (
          <div style={{ marginTop: '10px' }}>
            <button 
              className="btn btn--e-transparent-brand-b-2"
              type="button"
              onClick={handleClearFilter}
              style={{ width: '100%', fontSize: '12px' }}
            >
              Clear Price Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceFilter;