import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart, deleteCartItem } from "../../services/CartService";
import { getProductDetail } from "../../services/NewArrivalService";
import Swal from "sweetalert2";

const MiniCartHeader = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
  const fetchCartData = async () => {
    try {
      const res = await getCart();
      const items = Array.isArray(res?.cartDetails) ? res.cartDetails : [];

      const itemsWithDetails = await Promise.all(
        items.map(async (item) => {
          const idProduct = item.productVariant?.productId;
          const baseItem = {
            id: item.id,
            productVariantId: item.productVariantId,
            idProduct,
            quantity: item.quantity,
            price: item.unitPrice,
            color: item.productVariant?.color || "N/A",
            size: item.productVariant?.size || "N/A",
            image: item.productVariant?.variantImageUrl || "/images/default.jpg",
          };

          try {
            const productRes = await getProductDetail(idProduct);
            const productName = productRes?.data?.name || "Unnamed Product";
            return { ...baseItem, productName };
          } catch (err) {
            console.error(`Error fetching product ${idProduct}:`, err);
            return { ...baseItem, productName: "Unknown Product" };
          }
        })
      );

      setCartItems(itemsWithDetails);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    }
  };

  fetchCartData();

  const handleCartUpdated = () => fetchCartData();
  window.addEventListener("cartUpdated", handleCartUpdated);

  // 🔹 Cleanup event listener khi unmount
  return () => {
    window.removeEventListener("cartUpdated", handleCartUpdated);
  };
}, []);

  // Giữ nguyên UI, chỉ chỉnh phần xóa có Swal
  const handleDeleteItem = async (id) => {
    const confirm = await Swal.fire({
      title: "Xóa sản phẩm này?",
      text: "Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCartItem(id);
        setCartItems((prev) => prev.filter((item) => item.id !== id));

        Swal.fire({
          icon: "success",
          title: "Đã xóa!",
          text: "Sản phẩm đã được xóa khỏi giỏ hàng.",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Không thể xóa sản phẩm. Vui lòng thử lại!",
        });
      }
    }
  };

   const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  return (
    <div className="menu-init" id="navigation3">
      <button
        className="btn btn--icon toggle-button toggle-button--secondary fas fa-shopping-bag toggle-button-shop"
        type="button"
      ></button>
      <span className="total-item-round">{cartItems.length}</span>

      <div className="ah-lg-mode">
        <span className="ah-close">✕ Close</span>
        <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
          <li>
            <Link to="/">
              <i className="fas fa-home u-c-brand"></i>
            </Link>
          </li>

          <li>
            <Link to="/wishlist">
              <i className="far fa-heart"></i>
            </Link>
          </li>

          <li className="has-dropdown">
            <a className="mini-cart-shop-link">
              <i className="fas fa-shopping-bag"></i>
              <span className="total-item-round">{cartItems.length}</span>
            </a>
            <span className="js-menu-toggle"></span>

            <div className="mini-cart">
              <div className="mini-product-container gl-scroll u-s-m-b-15">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div className="card-mini-product" key={item.id}>
                      <div className="mini-product">
                        <div className="mini-product__image-wrapper">
                          <Link
                            className="mini-product__link"
                            to={`/product/${item.idProduct}`}
                          >
                            <img
                              className="u-img-fluid"
                              src={item.image}
                              alt={item.productName}
                            />
                          </Link>
                        </div>
                        <div className="mini-product__info-wrapper">
                          <span className="mini-product__category">
                            <Link to="/shop">Products</Link>
                          </span>
                          <span className="mini-product__name">
                            <Link to={`/product/${item.idProduct}`}>
                              {item.productName}
                            </Link>
                          </span>
                          <span className="mini-product__quantity">
                            {item.quantity} ×
                          </span>
                          <span className="mini-product__price">
                            {item.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </div>
                      <a
                        className="mini-product__delete-link far fa-trash-alt"
                        onClick={() => handleDeleteItem(item.id)}
                      ></a>
                    </div>
                  ))
                ) : (
                  <p className="u-s-m-b-15" style={{ textAlign: "center" }}>
                    Empty Carts 
                  </p>
                )}
              </div>

              <div className="mini-product-stat">
                <div className="mini-total">
                  <span className="subtotal-text">Subtotal</span>
                  <span className="subtotal-value">
                    {subtotal.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="mini-action">
                  <Link className="mini-link btn--e-brand-b-2" to="/checkout">
                    PROCEED TO CHECKOUT
                  </Link>
                  <Link
                    className="mini-link btn--e-transparent-secondary-b-2"
                    to="/cart"
                  >
                    VIEW CART
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MiniCartHeader;
