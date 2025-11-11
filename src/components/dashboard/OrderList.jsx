import React, { useEffect, useState } from 'react';
import { getProductVariantById } from '../../services/OrderService'

const OrderList = ({ orders }) => {
  const [productMap, setProductMap] = useState({});

  useEffect(() => {
    console.log("📦 Orders received in <OrderList />:", orders);
    if (!Array.isArray(orders)) {
      console.warn("⚠️ 'orders' is not an array! Received:", typeof orders);
    } else if (orders.length === 0) {
      console.info("ℹ️ Orders array is empty.");
    }
  }, [orders]);

  useEffect(() => {
    const fetchProductVariants = async () => {
      const newMap = { ...productMap };
      const variantIdsToFetch = new Set();

      // Collect all variant IDs from all order details
      for (const order of orders || []) {
        for (const detail of order.orderDetails || []) {
          const variantId = detail.productVariantId;
          if (variantId && !newMap[variantId]) {
            variantIdsToFetch.add(variantId);
          }
        }
      }

      // Fetch all missing variants
      for (const variantId of variantIdsToFetch) {
        try {
          const res = await getProductVariantById(variantId);
          console.log(res);
          newMap[variantId] = res.data;
        } catch (error) {
          console.error(`❌ Failed to load product for variant ${variantId}:`, error);
          newMap[variantId] = null;
        }
      }

      if (variantIdsToFetch.size > 0) {
        setProductMap(newMap);
      }
    };

    if (orders?.length) fetchProductVariants();
  }, [orders]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'Processing':
      case 'Pending':
        return 'badge--processing';
      case 'Shipped':
      case 'Confirmed':
        return 'badge--shipped';
      case 'Delivered':
        return 'badge--delivered';
      case 'Cancelled':
        return 'badge--cancelled';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'Processing':
      case 'Pending':
        return 'Processing';
      case 'Shipped':
      case 'Confirmed':
        return 'Shipped';
      case 'Delivered':
        return 'Delivered';
      case 'Cancelled':
        return 'Cancelled';
      default:
        return status || 'Unknown';
    }
  };

  return (
    <div className="m-order__list">
      {(orders || []).map((order, index) => {
        const orderDetails = order.orderDetails || [];
        const hasMultipleProducts = orderDetails.length >= 2;

        return (
          <div key={order.id || index} className="m-order__get">
            {/* Header */}
            <div className="manage-o__header u-s-m-b-30">
              <div className="dash-l-r">
                <div>
                  <div className="manage-o__text-2 u-c-secondary">
                    Order #{order.id}
                  </div>
                  <div className="manage-o__text u-c-silver">
                    Placed on {new Date(order.orderDate).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="dash__link dash__link--brand">
                    <a href="#">MANAGE</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Body - Products List */}
            <div
              className="manage-o__products"
              style={{
                maxHeight: hasMultipleProducts ? '400px' : 'none',
                overflowY: hasMultipleProducts ? 'auto' : 'visible',
                paddingRight: hasMultipleProducts ? '10px' : '0'
              }}
            >
              {orderDetails.map((detail, detailIndex) => {
                const variantId = detail.productVariantId;
                const variant = productMap[variantId];
                const quantity = detail.quantity || 0;
                const price = detail.price || 0;

                return (
                  <div
                    key={detailIndex}
                    className="manage-o__description"
                    style={{
                      marginBottom: detailIndex < orderDetails.length - 1 ? '20px' : '0',
                      paddingBottom: detailIndex < orderDetails.length - 1 ? '20px' : '0',
                      borderBottom: detailIndex < orderDetails.length - 1 ? '1px solid #e0e0e0' : 'none'
                    }}
                  >
                    <div className="description__container">
                      <div className="description__img-wrap">
                        <img
                          className="u-img-fluid"
                          src={variant?.variantImageUrl || '/images/default-product.jpg'}
                          alt={variant?.product?.name || 'Product'}
                        />
                      </div>
                      <div className="description-title">
                        {variant?.product?.name || 'Unnamed Product'}
                      </div>
                    </div>
                    <div className="description__info-wrap">
                      <div>
                        <span className="manage-o__text-2 u-c-silver">
                          Quantity:
                          <span className="manage-o__text-2 u-c-secondary"> {quantity}</span>
                        </span>
                      </div>
                      <div>
                        <span className="manage-o__text-2 u-c-silver">
                          Price:
                          <span className="manage-o__text-2 u-c-secondary">
                            ₫{price?.toLocaleString()}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer - Order Summary */}
            <div
              className="manage-o__footer"
              style={{
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '2px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span className={`manage-o__badge ${getStatusBadge(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <div>
                <span className="manage-o__text-2 u-c-silver">
                  Total Amount:
                  <span
                    className="manage-o__text-2 u-c-secondary"
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                  >
                    {' '}
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;