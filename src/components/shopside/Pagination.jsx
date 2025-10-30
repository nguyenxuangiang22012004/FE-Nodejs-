import React from "react";

const Pagination = ({ total, limit, currentPage, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / limit)); 
  
  return (
    <ul className="shop-p__pagination">
      {/* Nút Previous */}
      <li className={currentPage === 1 ? "is-disabled" : ""}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) onPageChange(currentPage - 1);
          }}
          className="fas fa-angle-left"
        ></a>
      </li>

      {/* Danh sách số trang */}
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <li key={page} className={page === currentPage ? "is-active" : ""}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        );
      })}

      {/* Nút Next */}
      <li className={currentPage === totalPages ? "is-disabled" : ""}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) onPageChange(currentPage + 1);
          }}
          className="fas fa-angle-right"
        ></a>
      </li>
    </ul>
  );
};

export default Pagination;
