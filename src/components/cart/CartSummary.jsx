import React from 'react';

const CartSummary = ({ subtotal, shipping, tax, grandTotal, onProceedToCheckout }) => {
  return (
    <div className="f-cart__pad-box">
      <div className="u-s-m-b-30">
        <table className="f-cart__table">
          <tbody>
            <tr>
              <td>SUBTOTAL</td>
              <td>${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td>SHIPPING</td>
              <td>${shipping.toFixed(2)}</td>
            </tr>
            <tr>
              <td>TAX</td>
              <td>${tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td>GRAND TOTAL</td>
              <td>${grandTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button 
          className="btn btn--e-brand-b-2" 
          type="button"
          onClick={onProceedToCheckout}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartSummary;