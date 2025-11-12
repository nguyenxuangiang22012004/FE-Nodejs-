import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CartSummary = ({ subtotal = 0, shipping = 0, tax = 0, grandTotal = 0, onProceedToCheckout }) => {
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    // Kiểm tra xem giỏ hàng có trống không
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Giỏ hàng trống!',
        text: 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.',
        confirmButtonColor: '#3085d6',
        timer: 2000
      });
      return;
    }

    // Kiểm tra người dùng đã đăng nhập chưa
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user ) {
      Swal.fire({
        icon: 'info',
        title: 'Vui lòng đăng nhập',
        text: 'Bạn cần đăng nhập để tiếp tục thanh toán.',
        showCancelButton: true,
        confirmButtonText: 'Đăng nhập',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          // Lưu URL hiện tại để redirect sau khi đăng nhập
          localStorage.setItem('redirectAfterLogin', '/checkout');
          navigate('/login');
        }
      });
      return;
    }

    // Gọi callback từ parent nếu có
    if (onProceedToCheckout) {
      onProceedToCheckout();
    }

    // Chuyển đến trang checkout
    navigate('/checkout');
  };

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
              <td>TAX</td>
              <td>{tax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
            <tr>
              <td>GRAND TOTAL</td>
              <td className="grand-total-price">
                {grandTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </td>
            </tr>
          </tbody>
        </table>   
      </div>
      <div>
        <button
          className="btn btn--e-brand-b-2"
          type="button"
          onClick={handleProceedToCheckout}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>

      <style jsx>{`
        .grand-total-price {
          font-weight: 700;
          font-size: 18px;
          color: #e74c3c;
        }

        .btn--e-brand-b-2:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn--e-brand-b-2:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default CartSummary;