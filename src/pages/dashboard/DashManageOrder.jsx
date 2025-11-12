import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById, getProductVariantById, cancelOrder } from '../../services/OrderService';
import { getUserAddressById } from "../../services/AddressService";
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardStats from '../../components/dashboard/DashboardStats';
import Swal from "sweetalert2";

const DashManageOrder = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productVariants, setProductVariants] = useState({});
  const [shippingAddress, setShippingAddress] = useState(null);

  // Hàm format tiền VND
  const formatVND = (amount) => {
    if (!amount && amount !== 0) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
  const handleCancelOrder = async () => {
    if (!orderData?.id) return;

    const { value: cancelReason } = await Swal.fire({
      title: "Hủy đơn hàng",
      input: "text",
      inputLabel: "Nhập lý do hủy đơn hàng",
      inputPlaceholder: "Lý do hủy...",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận hủy",
      cancelButtonText: "Hủy"
    });

    if (cancelReason !== undefined) {
      try {
        // Gọi API hủy đơn, chỉ gửi note
        await cancelOrder(orderData.id, cancelReason || "");

        Swal.fire("Đã hủy!", "Đơn hàng đã được hủy.", "success");

        setOrderData(prev => ({ ...prev, status: "cancelled" }));
      } catch (err) {
        Swal.fire("Lỗi!", err.response?.data?.message || err.message || "Hủy đơn thất bại", "error");
      }
    }
  };
  // Hàm render timeline dựa theo status
  const renderTimeline = (status) => {
    const timelineSteps = [
      { key: 'pending', label: 'Pending' },
      { key: 'processing', label: 'Processing' },
      { key: 'shipped', label: 'Shipped' },
      { key: 'delivered', label: 'Delivered' }
    ];

    // Map status để xác định step hiện tại
    const statusMap = {
      'pending': 0,
      'processing': 1,
      'confirmed': 1,
      'preparing': 1,
      'shipped': 2,
      'shipping': 2,
      'on_delivery': 2,
      'delivered': 3,
      'completed': 3,
      'cancelled': -1
    };



    const currentStepIndex = statusMap[status?.toLowerCase()] || 0;

    return (
      <div className="manage-o__timeline">
        <div className="timeline-row">
          {timelineSteps.map((step, index) => (
            <div key={step.key} className="col-lg-3 u-s-m-b-30">
              <div className="timeline-step">
                <div className={`timeline-l-i ${index <= currentStepIndex ? 'timeline-l-i--finish' : ''}`}>
                  <span className="timeline-circle"></span>
                </div>
                <span className="timeline-text">{step.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getOrderById(id);
        console.log('Order data:', data);
        setOrderData(data);

        // Fetch shipping address details
        if (data?.shippingAddressId) {
          try {
            const addressResponse = await getUserAddressById(data.shippingAddressId);
            console.log('Address data:', addressResponse);
            if (addressResponse?.success) {
              setShippingAddress(addressResponse.data);
            } else if (addressResponse) {
              setShippingAddress(addressResponse);
            }
          } catch (err) {
            console.error('Error fetching address:', err);
          }
        }

        // Fetch product variant details for each order detail
        if (data?.orderDetails?.length > 0) {
          const variantsData = {};

          await Promise.all(
            data.orderDetails.map(async (detail) => {
              try {
                const variantResponse = await getProductVariantById(detail.productVariantId);
                console.log(variantResponse);
                if (variantResponse?.success) {
                  variantsData[detail.productVariantId] = variantResponse.data;
                }
              } catch (err) {
                console.error(`Error fetching variant ${detail.productVariantId}:`, err);
              }
            })
          );

          setProductVariants(variantsData);
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin fa-3x"></i>
              <p>Loading order details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <div className="alert alert-danger">
              ❌ {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!orderData) {
    return (
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <div className="alert alert-warning">
              ❌ No order data available
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Kiểm tra số lượng sản phẩm để quyết định có scroll hay không
  const hasScroll = orderData?.orderDetails?.length >= 3;

  return (
    <>
      {/*====== Section 1 ======*/}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <div className="breadcrumb">
              <div className="breadcrumb__wrap">
                <ul className="breadcrumb__list">
                  <li className="has-separator">
                    <a href="/">Home</a>
                  </li>
                  <li className="is-marked">
                    <a href="/dashboard/orders">My Account</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section 1 ======*/}

      {/*====== Section 2 ======*/}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="dash">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  <DashboardSidebar activePage="orders" />
                  <DashboardStats />
                </div>
                <div className="col-lg-9 col-md-12">
                  <h1 className="dash__h1 u-s-m-b-30">Order Details</h1>

                  {/* Order Header */}
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                    <div className="dash__pad-2">
                      <div className="dash-l-r">
                        <div>
                          <div className="manage-o__text-2 u-c-secondary">
                            Order {orderData?.id || 'N/A'}
                          </div>
                          <div className="manage-o__text u-c-silver">
                            Placed on{" "}
                            {orderData?.orderDate
                              ? new Date(orderData.orderDate)
                                .toLocaleString("vi-VN", {
                                  timeZone: "Asia/Ho_Chi_Minh",
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })
                                .replace(",", "")
                              : "N/A"}
                          </div>
                        </div>
                        <div>
                          <div className="manage-o__text-2 u-c-silver">
                            Total: <span className="manage-o__text-2 u-c-secondary">
                              {formatVND(orderData?.total || orderData?.totalAmount || 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                    <div className="dash__pad-2">
                      <div className="manage-o">
                        <div className="manage-o__header u-s-m-b-30">
                          <div className="manage-o__icon">
                            <i className="fas fa-box u-s-m-r-5"></i>
                            <span className="manage-o__text">Package 1</span>
                          </div>
                        </div>
                        <div className="dash-l-r">
                          <div className="manage-o__text u-c-secondary">
                            Status: {orderData?.status || 'Processing'}
                          </div>
                          <div className="manage-o__icon">
                            <i className="fas fa-truck u-s-m-r-5"></i>
                            <span className="manage-o__text">
                              {orderData?.shippingMethod || 'Standard Shipping'}
                            </span>
                          </div>
                        </div>
                        <div className="dash-l-r" style={{ justifyContent: "flex-end", marginTop: "10px" }}>
                          {orderData?.status !== "cancelled" && orderData?.status !== "delivered" && (
                            <button
                              className="btn btn--e-brand-b-2"
                              style={{ backgroundColor: "#d33", border: "none" }}
                              onClick={handleCancelOrder}
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                        {/* Order Timeline - Dynamic */}
                        {renderTimeline(orderData?.status)}

                        {/* Order Items - With Scroll */}
                        <div
                          style={hasScroll ? {
                            maxHeight: '400px',
                            overflowY: 'auto',
                            paddingRight: '10px'
                          } : {}}
                        >
                          {orderData?.orderDetails?.length > 0 ? (
                            orderData.orderDetails.map((item, index) => {
                              const variant = productVariants[item.productVariantId];

                              return (
                                <div key={item.id || index} className="manage-o__description">
                                  <div className="description__container">
                                    <div className="description__img-wrap">
                                      <img
                                        className="u-img-fluid"
                                        src={variant?.variantImageUrl || '/placeholder.jpg'}
                                        alt={variant?.variantImageUrl || 'Product'}
                                      />
                                    </div>
                                    <div className="description-title">
                                      {variant?.product.name || 'Loading...'}
                                      {variant?.color && (
                                        <span className="dash__text-2"> - Color: {variant.color}</span>
                                      )}
                                      {variant?.size && (
                                        <span className="dash__text-2"> - Size: {variant.size}</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="description__info-wrap">
                                    <div>
                                      <span className="manage-o__text-2 u-c-silver">
                                        Quantity: <span className="manage-o__text-2 u-c-secondary">
                                          {item?.quantity || 1}
                                        </span>
                                      </span>
                                    </div>
                                    <div>
                                      <span className="manage-o__text-2 u-c-silver">
                                        Unit Price: <span className="manage-o__text-2 u-c-secondary">
                                          {formatVND(item?.unitPrice || 0)}
                                        </span>
                                      </span>
                                    </div>
                                    <div>
                                      <span className="manage-o__text-2 u-c-silver">
                                        Subtotal: <span className="manage-o__text-2 u-c-secondary">
                                          {formatVND(item?.subtotal || 0)}
                                        </span>
                                      </span>
                                    </div>
                                    <div>
                                      <span className="manage-o__text-2 u-c-silver">
                                        Note: <span className="manage-o__text-2 u-c-secondary">{item?.note || "No note"}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p>No items found</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address and Summary */}
                  <div className="row">
                    <div className="col-lg-6">
                      {/* Shipping Address */}
                      <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                        <div className="dash__pad-3">
                          <h2 className="dash__h2 u-s-m-b-8">Shipping Address</h2>
                          <h2 className="dash__h2 u-s-m-b-8">
                            {shippingAddress
                              ? `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim()
                              : orderData?.shippingAddress?.name || 'N/A'}
                          </h2>
                          <span className="dash__text-2">
                            {shippingAddress?.location || orderData?.shippingAddress?.address || 'No address'}
                          </span>
                          <br />
                          <span className="dash__text-2">
                            Phone: {shippingAddress?.phoneNumber || orderData?.shippingAddress?.phone || 'No phone'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      {/* Total Summary */}
                      <div className="dash__box dash__box--bg-white dash__box--shadow u-h-100">
                        <div className="dash__pad-3">
                          <h2 className="dash__h2 u-s-m-b-8">Total Summary</h2>
                          <div className="dash-l-r u-s-m-b-8">
                            <div className="manage-o__text-2 u-c-secondary">Subtotal</div>
                            <div className="manage-o__text-2 u-c-secondary">
                              {formatVND(orderData?.totalAmount || 0)}
                            </div>
                          </div>
                          {orderData?.discountApplied > 0 && (
                            <div className="dash-l-r u-s-m-b-8">
                              <div className="manage-o__text-2 u-c-secondary">Discount</div>
                              <div className="manage-o__text-2 u-c-secondary">
                                -{formatVND(orderData?.discountApplied || 0)}
                              </div>
                            </div>
                          )}
                          <div className="dash-l-r u-s-m-b-8">
                            <div className="manage-o__text-2 u-c-secondary">Shipping Fee</div>
                            <div className="manage-o__text-2 u-c-secondary">
                              {formatVND(orderData?.shippingCost || 0)}
                            </div>
                          </div>
                          <div className="dash-l-r u-s-m-b-8">
                            <div className="manage-o__text-2 u-c-secondary">
                              <strong>Total</strong>
                            </div>
                            <div className="manage-o__text-2 u-c-secondary">
                              <strong>
                                {formatVND(
                                  orderData?.payments?.amount ||
                                  ((orderData?.totalAmount || 0) + (orderData?.shippingCost || 0) - (orderData?.discountApplied || 0))
                                )}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section 2 ======*/}
    </>
  );
};

export default DashManageOrder;