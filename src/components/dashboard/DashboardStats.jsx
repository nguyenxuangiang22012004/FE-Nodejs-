import React from 'react';

const DashboardStats = ({ ordersPlaced = 0, canceledOrders = 0, wishlist = 0 }) => {
  return (
    // <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
    //   <div className="dash__pad-1">
    //     <ul className="dash__w-list">
    //       <li>
    //         <div className="dash__w-wrap">
    //           <span className="dash__w-icon dash__w-icon-style-1">
    //             <i className="fas fa-cart-arrow-down"></i>
    //           </span>
    //           <span className="dash__w-text">{ordersPlaced}</span>
    //           <span className="dash__w-name">Orders Placed</span>
    //         </div>
    //       </li>
    //       <li>
    //         <div className="dash__w-wrap">
    //           <span className="dash__w-icon dash__w-icon-style-2">
    //             <i className="fas fa-times"></i>
    //           </span>
    //           <span className="dash__w-text">{canceledOrders}</span>
    //           <span className="dash__w-name">Cancel Orders</span>
    //         </div>
    //       </li>
    //       <li>
    //         <div className="dash__w-wrap">
    //           <span className="dash__w-icon dash__w-icon-style-3">
    //             <i className="far fa-heart"></i>
    //           </span>
    //           <span className="dash__w-text">{wishlist}</span>
    //           <span className="dash__w-name">Wishlist</span>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    <span></span>
  );
};

export default DashboardStats;
