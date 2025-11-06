import React from 'react';
import OrderList from '../../components/dashboard/OrderList';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardStats from '../../components/dashboard/DashboardStats';
const DashMyOrder = () => {
  // Dữ liệu đơn hàng mẫu
  const orders = [
    {
      id: '305423126',
      date: '26 Oct 2016 09:08:37',
      products: [
        {
          image: 'images/product/electronic/product3.jpg',
          name: 'Yellow Wireless Headphone',
          status: 'processing',
          quantity: 1,
          total: 16.00
        }
      ]
    },
    {
      id: '305423127',
      date: '26 Oct 2016 09:08:37',
      products: [
        {
          image: 'images/product/women/product8.jpg',
          name: 'New Dress D Nice Elegant',
          status: 'shipped',
          quantity: 1,
          total: 16.00
        }
      ]
    },
    {
      id: '305423128',
      date: '26 Oct 2016 09:08:37',
      products: [
        {
          image: 'images/product/men/product8.jpg',
          name: 'New Fashion D Nice Elegant',
          status: 'delivered',
          quantity: 1,
          total: 16.00
        }
      ]
    }
  ];

  const stats = {
    ordersPlaced: 4,
    canceledOrders: 0,
    wishlist: 0
  };

  return (
    <>
      {/* Section 1 - Breadcrumb */}
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
                    <a href="dash-my-order.html">My Account</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - Dashboard Content */}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="dash">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  <DashboardSidebar activePage="address-book" />
                   <DashboardStats />
                </div>
                <div className="col-lg-9 col-md-12">
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                    <div className="dash__pad-2">
                      <h1 className="dash__h1 u-s-m-b-14">My Orders</h1>
                      
                      <span className="dash__text u-s-m-b-30">
                        Here you can see all products that have been delivered.
                      </span>
                      
                      {/* Order Filter */}
                      <form className="m-order u-s-m-b-30">
                        <div className="m-order__select-wrapper">
                          <label className="u-s-m-r-8" htmlFor="my-order-sort">Show:</label>
                          <select className="select-box select-box--primary-style" id="my-order-sort">
                            <option selected>Last 5 orders</option>
                            <option>Last 15 days</option>
                            <option>Last 30 days</option>
                            <option>Last 6 months</option>
                            <option>Orders placed in 2018</option>
                            <option>All Orders</option>
                          </select>
                        </div>
                      </form>
                      
                      {/* Order List */}
                      <OrderList orders={orders} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashMyOrder;