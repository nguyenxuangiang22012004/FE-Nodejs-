import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import WishlistItem from "../components/wishlist/WishlistItem";
import {
  getWishlist,
  removeFromWishlist, clearWishlist
} from "../services/WishlistService";
import AddToCartModal from "../components/modal/AddToCartModal";
import { addToCart } from "../services/CartService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const MySwal = withReactContent(Swal);
  const breadcrumbItems = [
    { label: "Home", link: "/", hasSeparator: true },
    { label: "Wishlist", link: "/wishlist", isMarked: true },
  ];

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await getWishlist();
        setWishlistItems(res?.wishlistDetailts || []);
      } catch (err) {
        console.error("Failed to load wishlist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemoveItem = async (productId) => {
    const result = await MySwal.fire({
      title: "Xóa sản phẩm?",
      text: "Bạn có chắc muốn xóa sản phẩm này khỏi wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        const res = await removeFromWishlist(productId);

        if (res.success) {
          setWishlistItems((prev) =>
            prev.filter((i) => i.product?.id !== productId)
          );

          MySwal.fire({
            icon: "success",
            title: "Đã xóa!",
            timer: 1200,
            showConfirmButton: false,
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "Xóa thất bại!",
            text: res.message || "Vui lòng thử lại.",
          });
        }
      } catch (err) {
        console.error("Remove wishlist item failed:", err);
        MySwal.fire({
          icon: "error",
          title: "Lỗi khi xóa!",
          text: "Không thể kết nối đến server.",
        });
      }
    }
  };

  const handleOpenAddToCart = (product) => {
    setSelectedProduct(product);
    setShowAddToCartModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowAddToCartModal(false);
  };

  const handleClearWishlist = async () => {
    const result = await MySwal.fire({
      title: "Xóa toàn bộ Wishlist?",
      text: "Bạn có chắc muốn xóa TẤT CẢ sản phẩm khỏi wishlist không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa hết",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        const res = await clearWishlist();
        
        if (res.success) {
          setWishlistItems([]);

          MySwal.fire({
            icon: "success",
            title: "Đã xóa toàn bộ!",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "Xóa thất bại!",
            text: res.message || "Vui lòng thử lại.",
          });
        }
      } catch (err) {
        console.error("Failed to clear wishlist:", err);
        MySwal.fire({
          icon: "error",
          title: "Lỗi kết nối!",
          text: "Không thể kết nối đến server.",
        });
      }
    }
  };

  if (loading)
    return (
      <div className="u-s-p-y-100 text-center">
        <h3>Loading your wishlist...</h3>
      </div>
    );

  return (
    <>
      <div className="wishlist-page">
        {/* Section 1 - Breadcrumb */}
        <div className="u-s-p-y-60">
          <div className="section__content">
            <div className="container">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>
        </div>

        {/* Section 2 - Wishlist Content */}
        <div className="u-s-p-b-60">
          {/* Section Intro */}
          <div className="section__intro u-s-m-b-60">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section__text-wrap">
                    <h1 className="section__heading u-c-secondary">Wishlist</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Content */}
          <div className="section__content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  {wishlistItems.length === 0 ? (
                    <div className="empty-wishlist">
                      <div className="empty-wishlist__icon">
                        <i className="far fa-heart"></i>
                      </div>
                      <h3 className="empty-wishlist__title">
                        Your wishlist is empty
                      </h3>
                      <p className="empty-wishlist__text">
                        Start adding items you love to your wishlist!
                      </p>
                      <Link to="/shop" className="btn btn--e-brand">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <>
                      {wishlistItems.map((item) => (
                        <WishlistItem
                          key={item.id}
                          item={item}
                          onRemove={handleRemoveItem}
                          onAddToCart={() => handleOpenAddToCart(item.product)}
                        />
                      ))}

                      <div className="col-lg-12">
                        <div className="route-box">
                          <div className="route-box__g">
                            <Link className="route-box__link" to="/shop">
                              <i className="fas fa-long-arrow-alt-left"></i>
                              <span>CONTINUE SHOPPING</span>
                            </Link>
                          </div>
                          <div className="route-box__g">
                            <button
                              className="route-box__link"
                              onClick={handleClearWishlist}
                            >
                              <i className="fas fa-trash"></i>
                              <span>CLEAR WISHLIST</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddToCartModal
        isOpen={showAddToCartModal}
        onClose={handleCloseModal}
        product={selectedProduct}
        onConfirmAddToCart={(cartItem) => {
          console.log("🛒 Added from wishlist:", cartItem);
          handleCloseModal();
        }}
      />
    </>
  );
};



export default Wishlist;
