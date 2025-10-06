import React from 'react';

const BlogPagination = () => {
  return (
    <ul className="blog-pg">
      <li className="blog-pg--active">
        <a href="blog-sidebar-none.html">1</a>
      </li>
      <li>
        <a href="blog-sidebar-none.html">2</a>
      </li>
      <li>
        <a href="blog-sidebar-none.html">3</a>
      </li>
      <li>
        <a href="blog-sidebar-none.html">4</a>
      </li>
      <li>
        <a className="fas fa-angle-right" href="blog-sidebar-none.html"></a>
      </li>
    </ul>
  );
};

export default BlogPagination;