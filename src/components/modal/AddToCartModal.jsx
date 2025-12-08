import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { colorMap } from '../../constant/colorMap';
import { addToCart } from '../../services/CartService';
import { getProductDetail } from '../../services/NewArrivalService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AddToCartModal = ({ isOpen, onClose, product, onConfirmAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [displayImage, setDisplayImage] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (isOpen && product?.id) {
        try {
          const res = await getProductDetail(product.id);
          console.log(res);
          setProductDetail(res.data);
          setDisplayImage(res.data.imageUrl);
          setCurrentPrice(res.data.price || product.price);
        } catch (error) {
          console.error("❌ Lỗi khi lấy chi tiết sản phẩm:", error);
        }
      }
    };
    fetchProductDetail();
  }, [isOpen, product?.id]);

  if (!isOpen || !product) return null;

  const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  const colors =
    (product.colors && product.colors.length > 0)
      ? product.colors.map(c => ({
        name: c,
        value: colorMap[c] || '#ccc'
      }))
      : [
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'Red', value: '#FF0000' },
        { name: 'Blue', value: '#0000FF' },
        { name: 'Navy', value: '#001f3f' }
      ];

  const handleConfirm = async () => {
    if (!selectedSize || !selectedColor) {
      MySwal.fire({
        icon: 'warning',
        title: 'Chọn thiếu!',
        text: 'Vui lòng chọn đầy đủ size và màu trước khi thêm vào giỏ hàng.',
        timer: 1500,
      });
      return;
    }

    const selectedVariant = productDetail?.productVariants?.find(
      (v) =>
        v.size?.toLowerCase() === selectedSize.toLowerCase() &&
        v.color?.toLowerCase() === selectedColor.toLowerCase()
    );

    if (!selectedVariant) {
      MySwal.fire({
        icon: 'error',
        title: 'Không tìm thấy biến thể!',
        text: 'Vui lòng chọn lại màu và size khác.',
      });
      return;
    }

    if (selectedVariant.stockQuantity <= 0) {
      MySwal.fire({
        icon: 'error',
        title: 'Sản phẩm tạm hết hàng',
        text: 'Vui lòng chọn size hoặc màu khác.',
        timer: 2000,
      });
      return;
    }

    if (quantity > selectedVariant.stockQuantity) {
      MySwal.fire({
        icon: 'warning',
        title: 'Không đủ hàng!',
        text: `Chỉ còn ${selectedVariant.stockQuantity} sản phẩm trong kho.`,
        timer: 2000,
      });
      return;
    }

    const variantId = selectedVariant.id;
    const finalPrice = selectedVariant.variantPrice || currentPrice;

    try {
      const res = await addToCart(variantId, quantity);
      if (res.success) {
        MySwal.fire({
          icon: 'success',
          title: 'Đã thêm vào giỏ hàng!',
          html: `
            <div style="text-align:left; font-size:15px; margin-top:10px">
              <b>Sản phẩm:</b> ${product.name}<br/>
              <b>Màu sắc:</b> ${selectedColor}<br/>
              <b>Kích cỡ:</b> ${selectedSize}<br/>
              <b>Số lượng:</b> ${quantity}<br/>
              <b>Tổng cộng:</b> ${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(finalPrice * quantity)}
            </div>
          `,
          timer: 1800,
          showConfirmButton: false,
        });

        const cartItem = {
          ...product,
          selectedSize,
          selectedColor,
          quantity,
          variantId,
          price: finalPrice,
        };

        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = existingCart.findIndex(
          (item) =>
            item.variantId === variantId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
        );

        if (existingItemIndex !== -1) {
          existingCart[existingItemIndex].quantity += quantity;
        } else {
          existingCart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        window.dispatchEvent(new Event("cartUpdated"));

        if (onConfirmAddToCart) {
          onConfirmAddToCart(cartItem);
        }
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Thêm thất bại!',
          text: res.message || 'Vui lòng thử lại.',
        });
      }
    } catch (error) {
      console.error('❌ Add to cart failed:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi kết nối!',
        text: 'Không thể kết nối tới máy chủ.',
      });
    } finally {
      onClose();
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    setCurrentPrice(productDetail?.price || product.price);
    onClose();
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleVariantSelect = (type, value) => {
    if (type === "size") {
      setSelectedSize(value);
    } else if (type === "color") {
      setSelectedColor(value);
    }

    const variant = productDetail?.productVariants?.find(
      (v) =>
        v.size?.toLowerCase() ===
        (type === "size" ? value.toLowerCase() : selectedSize?.toLowerCase()) &&
        v.color?.toLowerCase() ===
        (type === "color" ? value.toLowerCase() : selectedColor?.toLowerCase())
    );

    if (variant && variant.stockQuantity <= 0) {
      MySwal.fire({
        icon: 'warning',
        title: 'Sản phẩm tạm hết hàng',
        text: 'Vui lòng chọn size hoặc màu khác.',
        timer: 2000,
      });

      if (type === "size") {
        setSelectedSize('');
      } else if (type === "color") {
        setSelectedColor('');
      }
      return;
    }

    if (variant) {
      const newPrice = variant.variantPrice || productDetail?.price || product.price;
      setCurrentPrice(newPrice);
      
      if (variant.variantImageUrl) {
        setDisplayImage(variant.variantImageUrl);
      } else {
        setDisplayImage(productDetail?.imageUrl || product.imageUrl || product.image);
      }
    } else {
      setCurrentPrice(productDetail?.price || product.price);
    }
  };

  return (
    <>
      <div className="variant-modal-overlay" onClick={handleClose}>
        <div className="variant-modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="variant-modal-close" onClick={handleClose}>✕</button>

          {!showSuccess ? (
            <div className="variant-modal-body">
              <div className="variant-modal-image">
                <img src={displayImage} alt={product.name} />
              </div>

              <div className="variant-modal-content">
                <h2 className="variant-product-title">{product.name}</h2>
                
                <div className="variant-product-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  }).format(currentPrice)}
                  {selectedSize && selectedColor && currentPrice !== (productDetail?.price || product.price) && (
                    <span className="price-changed-badge"></span>
                  )}
                </div>

                <div className="variant-section">
                  <div className="variant-label">
                    Size
                    {selectedSize && <span className="variant-selected">{selectedSize}</span>}
                  </div>
                  <div className="size-options">
                    {sizes.map((size) => {
                      const hasStock = productDetail?.productVariants?.some(
                        (v) => v.size?.toLowerCase() === size.toLowerCase() && v.stockQuantity > 0
                      );

                      return (
                        <button
                          key={size}
                          className={`size-btn ${selectedSize === size ? 'selected' : ''} ${!hasStock ? 'out-of-stock' : ''}`}
                          onClick={() => hasStock && handleVariantSelect("size", size)}
                          disabled={!hasStock}
                        >
                          {size}
                          {!hasStock && <span className="stock-label">Hết</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="variant-section">
                  <div className="variant-label">
                    Color
                    {selectedColor && <span className="variant-selected">{selectedColor}</span>}
                  </div>
                  <div className="color-options">
                    {colors.map((color) => {
                      const hasStock = productDetail?.productVariants?.some(
                        (v) => v.color?.toLowerCase() === color.name.toLowerCase() && v.stockQuantity > 0
                      );

                      return (
                        <div
                          key={color.name}
                          className={`color-item ${selectedColor === color.name ? 'selected' : ''} ${!hasStock ? 'out-of-stock' : ''}`}
                          onClick={() => hasStock && handleVariantSelect("color", color.name)}
                          style={{ backgroundColor: color.value }}
                          title={`${color.name}${!hasStock ? ' - Hết hàng' : ''}`}
                        >
                          {!hasStock && <span className="color-stock-label">✕</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="variant-section">
                  <div className="variant-label">Quantity</div>
                  <div className="quantity-selector">
                    <button className="quantity-btn" onClick={() => handleQuantityChange('decrease')}>−</button>
                    <div className="quantity-display">{quantity}</div>
                    <button className="quantity-btn" onClick={() => handleQuantityChange('increase')}>+</button>
                  </div>
                </div>

                {/* {selectedSize && selectedColor && (
                  <div className="variant-section">
                    <div className="total-preview">
                      <span className="total-label">Tạm tính:</span>
                      <span className="total-value">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND"
                        }).format(currentPrice * quantity)}
                      </span>
                    </div>
                  </div>
                )} */}

                <div className="action-buttons">
                  <button className="btn-cancel" onClick={handleClose}>Cancel</button>
                  <button className="btn-add" onClick={handleConfirm}>Add to Cart</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="success-container">
              <div className="success-icon">
                <i className="fas fa-check"></i>
              </div>
              <h2 className="success-title">Added to Cart!</h2>

              <div className="success-details">
                <div className="success-detail-row">
                  <span className="success-detail-label">Product:</span>
                  <span className="success-detail-value">{product.name}</span>
                </div>
                <div className="success-detail-row">
                  <span className="success-detail-label">Size:</span>
                  <span className="success-detail-value">{selectedSize}</span>
                </div>
                <div className="success-detail-row">
                  <span className="success-detail-label">Color:</span>
                  <span className="success-detail-value">{selectedColor}</span>
                </div>
                <div className="success-detail-row">
                  <span className="success-detail-label">Quantity:</span>
                  <span className="success-detail-value">{quantity}</span>
                </div>
                <div className="success-detail-row success-total-row">
                  <span className="success-detail-label">Total:</span>
                  <span className="success-detail-value success-total-value">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    }).format(currentPrice * quantity)}
                  </span>
                </div>
              </div>

              <div className="success-actions">
                <button className="success-btn success-btn-continue" onClick={handleClose}>
                  Continue Shopping
                </button>
                <Link to="/cart" className="success-btn success-btn-cart" onClick={handleClose}>
                  View Cart
                </Link>
                <Link to="/checkout" className="success-btn success-btn-checkout" onClick={handleClose}>
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .variant-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 9999;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popupScale {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.7);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .variant-modal-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 900px;
          width: 90%;
          max-height: 90vh;
          overflow: hidden;
          z-index: 10000;
          animation: popupScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .variant-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.05);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }

        .variant-modal-close:hover {
          background: rgba(0, 0, 0, 0.1);
          transform: rotate(90deg);
        }

        .variant-modal-body {
          display: flex;
          max-height: 90vh;
          overflow-y: auto;
        }

        .variant-modal-image {
          flex: 0 0 45%;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
        }

        .variant-modal-image img {
          max-width: 100%;
          max-height: 500px;
          object-fit: contain;
          border-radius: 12px;
        }

        .variant-modal-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }

        .variant-product-title {
          font-size: 24px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .variant-product-price {
          font-size: 28px;
          font-weight: 700;
          color: #e74c3c;
          margin-bottom: 32px;
        }

        .variant-section {
          margin-bottom: 28px;
        }

        .variant-label {
          font-size: 14px;
          font-weight: 600;
          color: #34495e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .variant-selected {
          color: #e74c3c;
          font-weight: 700;
        }

        .size-options {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .size-btn {
          min-width: 60px;
          height: 44px;
          border: 2px solid #dee2e6;
          background: white;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          color: #495057;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .size-btn:hover {
          border-color: #adb5bd;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .size-btn.selected {
          border-color: #2c3e50;
          background: #2c3e50;
          color: white;
          transform: scale(1.05);
        }

        .size-btn.out-of-stock {
          opacity: 0.4;
          cursor: not-allowed;
          position: relative;
          background: #f8f9fa;
          color: #adb5bd;
        }

        .size-btn.out-of-stock:hover {
          border-color: #dee2e6;
          transform: none;
          box-shadow: none;
        }

        .stock-label {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #e74c3c;
          color: white;
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 700;
        }

        .color-options {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .color-item {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
          border: 3px solid transparent;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
        }

        .color-item[title*="Trắng"],
        .color-item[title*="White"] {
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.25);
        }

        .color-item:hover {
          transform: scale(1.1);
        }

        .color-item.selected {
          border-color: #2c3e50;
          box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.2);
          transform: scale(1.15);
        }

        .color-item.selected::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 18px;
          font-weight: bold;
          text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        }

        .color-item.out-of-stock {
          opacity: 0.3;
          cursor: not-allowed;
          filter: grayscale(60%);
        }

        .color-item.out-of-stock:hover {
          transform: none;
        }

        .color-stock-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #e74c3c;
          font-size: 24px;
          font-weight: bold;
          text-shadow: 0 0 3px white, 0 0 5px white;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .quantity-btn {
          width: 40px;
          height: 40px;
          border: 2px solid #dee2e6;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #495057;
          transition: all 0.2s;
        }

        .quantity-btn:hover {
          border-color: #2c3e50;
          color: #2c3e50;
          background: #f8f9fa;
        }

        .quantity-btn:active {
          transform: scale(0.95);
        }

        .quantity-display {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          min-width: 40px;
          text-align: center;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid #e9ecef;
        }

        .btn-cancel {
          flex: 1;
          height: 52px;
          border: 2px solid #dee2e6;
          background: white;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          border-color: #adb5bd;
          color: #495057;
          background: #f8f9fa;
        }

        .btn-add {
          flex: 2;
          height: 52px;
          border: none;
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
        }

        .btn-add:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
        }

        .btn-add:active {
          transform: translateY(0);
        }

        .success-container {
          padding: 40px;
          text-align: center;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          animation: scaleIn 0.4s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-icon i {
          font-size: 40px;
          color: white;
        }

        .success-title {
          font-size: 24px;
          font-weight: 700;
          color: #27ae60;
          margin-bottom: 16px;
        }

        .success-product-img {
          width: 200px;
          height: 200px;
          object-fit: contain;
          margin: 20px auto;
          border-radius: 12px;
        }

        .success-details {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin: 24px 0;
          text-align: left;
        }

        .success-detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 15px;
        }

        .success-detail-label {
          color: #6c757d;
          font-weight: 500;
        }

        .success-detail-value {
          color: #2c3e50;
          font-weight: 600;
        }

        .success-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .success-btn {
          height: 48px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-btn-continue {
          background: white;
          border: 2px solid #dee2e6;
          color: #495057;
        }

        .success-btn-continue:hover {
          border-color: #2c3e50;
          color: #2c3e50;
        }

        .success-btn-cart {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          border: none;
          color: white;
          box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }

        .success-btn-cart:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }

        .success-btn-checkout {
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          border: none;
          color: white;
          box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
        }

        .success-btn-checkout:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
        }

        @media (max-width: 768px) {
          .variant-modal-body {
            flex-direction: column;
          }
          
          .variant-modal-image {
            flex: none;
            padding: 24px;
          }
          
          .variant-modal-content {
            padding: 24px;
          }

          .variant-product-title {
            font-size: 20px;
          }

          .variant-product-price {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default AddToCartModal;