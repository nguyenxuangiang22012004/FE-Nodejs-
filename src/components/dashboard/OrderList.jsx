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
    const fetchProductRepresentatives = async () => {
      const newMap = {};

      for (const order of orders || []) {
        const firstDetail = order.orderDetails?.[0];
        if (!firstDetail) continue;

        const variantId = firstDetail.productVariantId;
        if (!variantId) continue;

        if (productMap[variantId]) {
          newMap[variantId] = productMap[variantId];
          continue;
        }

        try {
          const res = await getProductVariantById(variantId);
          console.log(res);
          newMap[variantId] = res.data;
        } catch (error) {
          console.error(`❌ Failed to load product for variant ${variantId}:`, error);
          newMap[variantId] = null;
        }
      }

      setProductMap(newMap);
    };

    if (orders?.length) fetchProductRepresentatives();
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
        const firstItem = order.orderDetails?.[0];
        const variantId = firstItem?.productVariantId;
        const variant = productMap[variantId]; 
        const quantity = firstItem?.quantity || 0;
        const price = firstItem?.price || 0;

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

            {/* Body */}
            <div className="manage-o__description">
              <div className="description__container">
                <div className="description__img-wrap">
                  <img
                    className="u-img-fluid"
                    src={variant?.variantImageUrl || '/images/default-product.jpg'} // ✅ lấy ảnh từ variant
                    alt={variant?.variantImageUrl || 'Product'}
                  />
                </div>
                <div className="description-title">
                  {variant?.product?.name|| 'Unnamed Product'} {/* ✅ tên từ variant */}
                </div>
              </div>
              <div className="description__info-wrap">
                <div>
                  <span className={`manage-o__badge ${getStatusBadge(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div>
                  <span className="manage-o__text-2 u-c-silver">
                    Quantity:
                    <span className="manage-o__text-2 u-c-secondary"> {quantity}</span>
                  </span>
                </div>
                <div>
                  <span className="manage-o__text-2 u-c-silver">
                    Total:
                    <span className="manage-o__text-2 u-c-secondary">
                      ₫{order.totalAmount?.toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
