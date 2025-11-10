import React from 'react';

const CartSummary = ({ subtotal, shipping, tax, grandTotal, onProceedToCheckout }) => {
  return (
    <div className="f-cart__pad-box">
      <div className="u-s-m-b-30">
        <table className="f-cart__table">
          <tbody>
            <tr>
              <td>SUBTOTAL</td>
              <td>{subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
            <tr>
              <td>SHIPPING</td>
              <td>{shipping.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
            <tr>
              <td>GRAND TOTAL</td>
              <td>{grandTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
          </tbody>
        </table>
        💡 Giải thích:
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