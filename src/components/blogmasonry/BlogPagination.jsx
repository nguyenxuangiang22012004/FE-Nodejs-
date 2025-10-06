import React from 'react';

const BlogPagination = () => {
  return (
    <ul className="blog-pg">
      <li className="blog-pg--active">
        <a href="blog-masonry.html">1</a>
      </li>
      <li>
        <a href="blog-masonry.html">2</a>
      </li>
      <li>
        <a href="blog-masonry.html">3</a>
      </li>
      <li>
        <a href="blog-masonry.html">4</a>
      </li>
      <li>
        <a className="fas fa-angle-right" href="blog-masonry.html"></a>
      </li>
    </ul>
  );
};

export default BlogPagination;