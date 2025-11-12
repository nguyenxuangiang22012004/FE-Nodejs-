import React from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardStats from '../../components/dashboard/DashboardStats';
import { useLocation } from 'react-router-dom';
const DashManageOrder = () => {
  // Dữ liệu mẫu cho đơn hàng
  const location = useLocation();
  const orderData = location.state?.order; 

  if (!orderData) {
    return <div>❌ No order data available</div>;
  }

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
                    <a href="index.html">Home</a>
                  </li>
                  <li className="is-marked">
                    <a href="dash-manage-order.html">My Account</a>
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
                  <DashboardSidebar />
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
                            Order {orderData.orderNumber}
                          </div>
                          <div className="manage-o__text u-c-silver">
                            Placed on {orderData.orderDate}
                          </div>
                        </div>
                        <div>
                          <div className="manage-o__text-2 u-c-silver">
                            Total: <span className="manage-o__text-2 u-c-secondary">{orderData.total}</span>
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
                            Delivered on {orderData.deliveredDate}
                          </div>
                          <div className="manage-o__icon">
                            <i className="fas fa-truck u-s-m-r-5"></i>
                            <span className="manage-o__text">{orderData.shippingMethod}</span>
                          </div>
                        </div>
                        
                        {/* Order Timeline */}
                        <div className="manage-o__timeline">
                          <div className="timeline-row">
                            <div className="col-lg-4 u-s-m-b-30">
                              <div className="timeline-step">
                                <div className="timeline-l-i timeline-l-i--finish">
                                  <span className="timeline-circle"></span>
                                </div>
                                <span className="timeline-text">Processing</span>
                              </div>
                            </div>
                            <div className="col-lg-4 u-s-m-b-30">
                              <div className="timeline-step">
                                <div className="timeline-l-i timeline-l-i--finish">
                                  <span className="timeline-circle"></span>
                                </div>
                                <span className="timeline-text">Shipped</span>
                              </div>
                            </div>
                            <div className="col-lg-4 u-s-m-b-30">
                              <div className="timeline-step">
                                <div className="timeline-l-i">
                                  <span className="timeline-circle"></span>
                                </div>
                                <span className="timeline-text">Delivered</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        {orderData.items.map((item, index) => (
                          <div key={index} className="manage-o__description">
                            <div className="description__container">
                              <div className="description__img-wrap">
                                <img className="u-img-fluid" src={item.image} alt={item.name} />
                              </div>
                              <div className="description-title">{item.name}</div>
                            </div>
                            <div className="description__info-wrap">
                              <div>
                                <span className="manage-o__text-2 u-c-silver">
                                  Quantity: <span className="manage-o__text-2 u-c-secondary">{item.quantity}</span>
                                </span>
                              </div>
                              <div>
                                <span className="manage-o__text-2 u-c-silver">
                                  Total: <span className="manage-o__text-2 u-c-secondary">{item.price}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
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
                          <h2 className="dash__h2 u-s-m-b-8">{orderData.shippingAddress.name}</h2>
                          <span className="dash__text-2">{orderData.shippingAddress.address}</span>
                          <span className="dash__text-2">{orderData.shippingAddress.phone}</span>
                        </div>
                      </div>
                      
                      {/* Billing Address */}
                      <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                        <div className="dash__pad-3">
                          <h2 className="dash__h2 u-s-m-b-8">Billing Address</h2>
                          <h2 className="dash__h2 u-s-m-b-8">{orderData.billingAddress.name}</h2>
                          <span className="dash__text-2">{orderData.billingAddress.address}</span>
                          <span className="dash__text-2">{orderData.billingAddress.phone}</span>
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
                            <div className="manage-o__text-2 u-c-secondary">{orderData.summary.subtotal}</div>
                          </div>
                          <div className="dash-l-r u-s-m-b-8">
                            <div className="manage-o__text-2 u-c-secondary">Shipping Fee</div>
                            <div className="manage-o__text-2 u-c-secondary">{orderData.summary.shippingFee}</div>
                          </div>
                          <div className="dash-l-r u-s-m-b-8">
                            <div className="manage-o__text-2 u-c-secondary">Total</div>
                            <div className="manage-o__text-2 u-c-secondary">{orderData.summary.total}</div>
                          </div>
                          <span className="dash__text-2">Paid by {orderData.summary.paymentMethod}</span>
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