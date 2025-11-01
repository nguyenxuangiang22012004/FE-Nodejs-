import React, { useState, useEffect } from 'react';
import CartBreadcrumb from '../components/cart/CartBreadcrumb';
import CartItems from '../components/cart/CartItems';
import CartSummary from '../components/cart/CartSummary';
import ShippingCalculator from '../components/cart/ShippingCalculator';
import CartNote from '../components/cart/CartNote';
import { getCart, updateCart, deleteCartItem, clearCart } from '../services/CartService';
import { getProductDetail } from '../services/NewArrivalService';
import Swal from 'sweetalert2';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({ country: '', state: '', zip: '' });
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await getCart();
        console.log('Cart API response:', res);

        const items = Array.isArray(res?.cartDetails) ? res.cartDetails : [];

        const mappedItems = items.map(item => ({
          id: item.id,
          idProduct: item.productVariant?.productId || null,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          price: item.unitPrice,
          color: item.productVariant?.color || 'N/A',
          size: item.productVariant?.size || 'N/A',
          image: item.productVariant?.variantImageUrl || 'images/default.jpg',
        }));

        const itemsWithProductNames = await Promise.all(
          mappedItems.map(async (item) => {
            if (!item.idProduct) return { ...item, productName: 'Unknown Product' };

            try {
              const productRes = await getProductDetail(item.idProduct);
              const productName =
                productRes?.data?.name || 'Unnamed Product';

              return { ...item, productName };
            } catch (err) {
              console.error(`Error fetching product ${item.idProduct}`, err);
              return { ...item, productName: 'Unknown Product' };
            }
          })
        );

        setCartItems(itemsWithProductNames);
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // --- Handlers ---
  const handleQuantityChange = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = async (id) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if (!itemToRemove) return;

    const result = await Swal.fire({
      title: 'Xác nhận xóa?',
      text: `Bạn có chắc muốn xóa "${itemToRemove.productName}" khỏi giỏ hàng?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCartItem(itemToRemove.productVariantId);
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa khỏi giỏ hàng.', 'success');
    } catch (error) {
      console.error('Failed to delete item from cart:', error);
      Swal.fire('Lỗi', 'Xóa sản phẩm thất bại. Vui lòng thử lại.', 'error');
    }
  };

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: 'Xác nhận xóa toàn bộ giỏ hàng?',
      text: 'Tất cả sản phẩm sẽ bị xóa. Hành động này không thể hoàn tác.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa tất cả',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (!result.isConfirmed) return;

    try {
      await clearCart();
      setCartItems([]);
      Swal.fire('Đã xóa!', 'Toàn bộ giỏ hàng đã được làm trống.', 'success');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      Swal.fire('Lỗi', 'Không thể xóa giỏ hàng. Vui lòng thử lại.', 'error');
    }
  };
  const handleUpdateCart = async () => {
    if (cartItems.length === 0) {
      Swal.fire('Giỏ hàng trống', 'Không có sản phẩm nào để cập nhật.', 'info');
      return;
    }

    try {
      const res = await updateCart(cartItems);
      console.log('Cart updated successfully:', res);

      Swal.fire({
        title: 'Thành công!',
        text: 'Giỏ hàng của bạn đã được cập nhật.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Failed to update cart:', error);

      Swal.fire({
        title: 'Lỗi!',
        text: 'Không thể cập nhật giỏ hàng. Vui lòng thử lại.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Đóng',
      });
    }
  };
  const handleShippingInfoChange = (field, value) =>
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  const handleCalculateShipping = () =>
    console.log('Calculating shipping with:', shippingInfo);
  const handleNoteChange = value => setNote(value);
  const handleProceedToCheckout = () => console.log('Proceeding to checkout');

  // --- Totals ---
  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
    : 0;
  const shipping = 4.0;
  const tax = 0.0;
  const grandTotal = subtotal + shipping + tax;

  return (
    <>
      {/* Section 1 - Breadcrumb */}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <CartBreadcrumb />
          </div>
        </div>
      </div>

      {/* Section 2 - Cart Items */}
      <div className="u-s-p-b-60">
        {/* Section Intro */}
        <div className="section__intro u-s-m-b-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary">SHOPPING CART</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                <CartItems
                  items={cartItems}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                />
              </div>
              <div className="col-lg-12">
                <div className="route-box">
                  <div className="route-box__g1">
                    <a className="route-box__link" href="/shop">
                      <i className="fas fa-long-arrow-alt-left"></i>
                      <span>CONTINUE SHOPPING</span>
                    </a>
                  </div>
                  <div className="route-box__g2">
                    <button
                      className="route-box__link"
                      onClick={handleClearCart}
                    >
                      <i className="fas fa-trash"></i>
                      <span>CLEAR CART</span>
                    </button>
                    <button
                      className="route-box__link"
                      onClick={handleUpdateCart}
                    >
                      <i className="fas fa-sync"></i>
                      <span>UPDATE CART</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 - Cart Summary & Forms */}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                <form className="f-cart">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 u-s-m-b-30">
                      <ShippingCalculator
                        shippingInfo={shippingInfo}
                        onShippingInfoChange={handleShippingInfoChange}
                        onCalculateShipping={handleCalculateShipping}
                      />
                    </div>
                    <div className="col-lg-4 col-md-6 u-s-m-b-30">
                      <CartNote
                        note={note}
                        onNoteChange={handleNoteChange}
                      />
                    </div>
                    <div className="col-lg-4 col-md-6 u-s-m-b-30">
                      <CartSummary
                        subtotal={subtotal}
                        shipping={shipping}
                        tax={tax}
                        grandTotal={grandTotal}
                        onProceedToCheckout={handleProceedToCheckout}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;