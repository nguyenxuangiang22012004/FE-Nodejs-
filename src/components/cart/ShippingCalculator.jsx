import React from 'react';

const ShippingCalculator = ({ shippingInfo, onShippingInfoChange, onCalculateShipping }) => {
  return (
    <div className="f-cart__pad-box">
      <h1 className="gl-h1">ESTIMATE SHIPPING AND TAXES</h1>
      <span className="gl-text u-s-m-b-30">Enter your destination to get a shipping estimate.</span>
      
      <div className="u-s-m-b-30">
        <label className="gl-label" htmlFor="shipping-country">COUNTRY *</label>
        <select 
          className="select-box select-box--primary-style" 
          id="shipping-country"
          value={shippingInfo.country}
          onChange={(e) => onShippingInfoChange('country', e.target.value)}
        >
          <option value="">Choose Country</option>
          <option value="uae">United Arab Emirate (UAE)</option>
          <option value="uk">United Kingdom (UK)</option>
          <option value="us">United States (US)</option>
        </select>
      </div>
      
      <div className="u-s-m-b-30">
        <label className="gl-label" htmlFor="shipping-state">STATE/PROVINCE *</label>
        <select 
          className="select-box select-box--primary-style" 
          id="shipping-state"
          value={shippingInfo.state}
          onChange={(e) => onShippingInfoChange('state', e.target.value)}
        >
          <option value="">Choose State/Province</option>
          <option value="al">Alabama</option>
          <option value="ak">Alaska</option>
          <option value="ny">New York</option>
        </select>
      </div>
      
      <div className="u-s-m-b-30">
        <label className="gl-label" htmlFor="shipping-zip">ZIP/POSTAL CODE *</label>
        <input 
          className="input-text input-text--primary-style" 
          type="text" 
          id="shipping-zip" 
          placeholder="Zip/Postal Code"
          value={shippingInfo.zip}
          onChange={(e) => onShippingInfoChange('zip', e.target.value)}
        />
      </div>
      
      <div className="u-s-m-b-30">
        <button 
          className="f-cart__ship-link btn--e-transparent-brand-b-2" 
          type="button"
          onClick={onCalculateShipping}
        >
          CALCULATE SHIPPING
        </button>
      </div>
      
      <span className="gl-text">
        Note: There are some countries where free shipping is available otherwise our flat rate charges or country delivery charges will be apply.
      </span>
    </div>
  );
};

export default ShippingCalculator;