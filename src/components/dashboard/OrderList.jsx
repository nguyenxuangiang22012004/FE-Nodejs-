import React from 'react';

const OrderList = ({ orders }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'processing':
        return 'badge--processing';
      case 'shipped':
        return 'badge--shipped';
      case 'delivered':
        return 'badge--delivered';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  return (
    <div className="m-order__list">
      {orders.map((order, index) => (
        <div key={index} className="m-order__get">
          {order.products.map((product, productIndex) => (
            <div key={productIndex}>
              <div className="manage-o__header u-s-m-b-30">
                <div className="dash-l-r">
                  <div>
                    <div className="manage-o__text-2 u-c-secondary">
                      Order #{order.id}
                    </div>
                    <div className="manage-o__text u-c-silver">
                      Placed on {order.date}
                    </div>
                  </div>
                  <div>
                    <div className="dash__link dash__link--brand">
                      <a href="dash-manage-order.html">MANAGE</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="manage-o__description">
                <div className="description__container">
                  <div className="description__img-wrap">
                    <img className="u-img-fluid" src={product.image} alt={product.name} />
                  </div>
                  <div className="description-title">{product.name}</div>
                </div>
                <div className="description__info-wrap">
                  <div>
                    <span className={`manage-o__badge ${getStatusBadge(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </div>
                  <div>
                    <span className="manage-o__text-2 u-c-silver">
                      Quantity: 
                      <span className="manage-o__text-2 u-c-secondary"> {product.quantity}</span>
                    </span>
                  </div>
                  <div>
                    <span className="manage-o__text-2 u-c-silver">
                      Total: 
                      <span className="manage-o__text-2 u-c-secondary"> ${product.total.toFixed(2)}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderList;