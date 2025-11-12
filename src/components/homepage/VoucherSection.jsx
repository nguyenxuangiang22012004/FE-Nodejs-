// src/components/homepage/VoucherSection.jsx
import React, { useState, useEffect } from 'react';
import {getAllVouchers , claimVoucher} from '../../services/voucherService';
import Swal from 'sweetalert2';

const VoucherSection = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState(null);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const data = await getAllVouchers();
      setVouchers(data.vouchers || data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Không thể tải danh sách mã giảm giá',
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClaimVoucher = async (voucherId) => {
    try {
      setClaiming(voucherId);
      const response = await claimVoucher(voucherId);
      
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Nhận mã giảm giá thành công!',
        confirmButtonColor: '#3085d6',
        timer: 2000
      });
      
      fetchVouchers();
    } catch (error) {
      console.error('Error claiming voucher:', error);
      const errorMessage = error.response?.data?.message || 'Không thể nhận mã giảm giá';
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        confirmButtonColor: '#d33'
      });
    } finally {
      setClaiming(null);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="u-s-p-y-60">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="u-s-p-y-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section__intro u-s-m-b-46">
              <div className="section__text-wrap">
                <h1 className="section__heading u-c-secondary u-s-m-b-12">
                  🎁 MÃ GIẢM GIÁ HẤP DẪN
                </h1>
                <span className="section__span u-c-silver">
                  Nhận ngay các mã giảm giá độc quyền dành riêng cho bạn
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {vouchers.length > 0 ? (
            vouchers.map((voucher) => {
              const promotionLabel = voucher.promotionalType === 'SHIPPING' 
                ? 'Miễn phí vận chuyển' 
                : voucher.promotionalType === 'PRODUCT' 
                ? 'Giảm giá sản phẩm'
                : 'Giảm giá đơn hàng';
              
              const discountDisplay = voucher.discountType === 'PERCENTAGE' 
                ? `${voucher.discountValue}%` 
                : `${voucher.discountValue}đ`;

              const isExpired = new Date(voucher.endDate) < new Date();
              const isNotStarted = new Date(voucher.startDate) > new Date();

              return (
                <div key={voucher.id} className="col-lg-4 col-md-6 col-sm-12 u-s-m-b-30">
                  <div className={`voucher-card ${isExpired || isNotStarted ? 'voucher-card--disabled' : ''}`}>
                    <div className="voucher-card__header">
                      <div className="voucher-badge">{promotionLabel}</div>
                      <div className="voucher-discount">
                        <span className="voucher-discount__value">
                          {discountDisplay}
                        </span>
                        <span className="voucher-discount__text">OFF</span>
                      </div>
                    </div>
                    
                    <div className="voucher-card__body">
                      <div className="voucher-code">
                        <span className="voucher-code__label">Mã:</span>
                        <span className="voucher-code__value">{voucher.code}</span>
                      </div>
                      
                      <div className="voucher-info">
                        <div className="voucher-info__item">
                          <i className="fas fa-calendar-check"></i>
                          <span>Bắt đầu: {formatDateTime(voucher.startDate)}</span>
                        </div>
                        
                        <div className="voucher-info__item">
                          <i className="fas fa-calendar-times"></i>
                          <span>Kết thúc: {formatDateTime(voucher.endDate)}</span>
                        </div>
                        

                        {voucher.minOrderValue && (
                          <div className="voucher-info__item">
                            <i className="fas fa-shopping-cart"></i>
                            <span>Đơn tối thiểu: {voucher.minOrderValue}đ</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="voucher-card__footer">
                      <button
                        className={`btn btn--e-brand-b-2 ${(voucher.isClaimed || isExpired || isNotStarted) ? 'btn--disabled' : ''}`}
                        onClick={() => handleClaimVoucher(voucher.id)}
                        disabled={claiming === voucher.id || voucher.isClaimed || isExpired || isNotStarted}
                      >
                        {claiming === voucher.id ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Đang nhận...
                          </>
                        ) : voucher.isClaimed ? (
                          <>
                            <i className="fas fa-check me-2"></i>
                            Đã nhận
                          </>
                        ) : isExpired ? (
                          <>
                            <i className="fas fa-times me-2"></i>
                            Đã hết hạn
                          </>
                        ) : isNotStarted ? (
                          <>
                            <i className="fas fa-clock me-2"></i>
                            Chưa bắt đầu
                          </>
                        ) : (
                          <>
                            <i className="fas fa-gift me-2"></i>
                            Nhận ngay
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center">
              <p className="u-c-silver">Hiện tại không có mã giảm giá nào</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .voucher-card {
          border: 2px dashed #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .voucher-card--disabled {
          opacity: 0.6;
          background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
        }

        .voucher-card:hover:not(.voucher-card--disabled) {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .voucher-card__header {
          padding: 20px;
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .voucher-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.3);
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .voucher-discount {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;
        }

        .voucher-discount__value {
          font-size: 48px;
          font-weight: 700;
          line-height: 1;
        }

        .voucher-discount__text {
          font-size: 18px;
          font-weight: 600;
          margin-top: 5px;
        }

        .voucher-card__body {
          padding: 20px;
          flex: 1;
        }

        .voucher-code {
          background: rgba(255, 255, 255, 0.2);
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 15px;
          text-align: center;
          border: 1px dashed rgba(255, 255, 255, 0.3);
        }

        .voucher-code__label {
          font-size: 12px;
          opacity: 0.9;
          margin-right: 8px;
        }

        .voucher-code__value {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
        }

        .voucher-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .voucher-info__item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.9);
          padding: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
        }

        .voucher-info__item i {
          width: 18px;
          text-align: center;
        }

        .voucher-card__footer {
          padding: 20px;
        }

        .voucher-card__footer .btn {
          width: 100%;
          padding: 12px;
          font-weight: 600;
          border: none;
          background: white;
          color: #667eea;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .voucher-card__footer .btn:hover:not(:disabled) {
          background: #f0f0f0;
          transform: scale(1.02);
        }

        .voucher-card__footer .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn--disabled {
          background: #e0e0e0 !important;
          color: #999 !important;
        }

        @media (max-width: 768px) {
          .voucher-discount__value {
            font-size: 36px;
          }
          
          .voucher-code__value {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default VoucherSection;