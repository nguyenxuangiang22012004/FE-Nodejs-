import React from 'react';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      img: 'post-2.jpg',
      date: '25 February 2018',
      author: 'Dayle',
      comments: 8,
      categories: ['Learning', 'News', 'Health'],
      title: 'Life is an extraordinary Adventure',
      excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      tags: ['Travel', 'Culture', 'Place']
    },
    {
      id: 2,
      img: 'post-12.jpg',
      date: '25 February 2018',
      author: 'Dayle',
      comments: 8,
      categories: ['Learning', 'News', 'Health'],
      title: 'Wait till its open',
      excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      tags: ['Travel', 'Culture', 'Place']
    },
    {
      id: 3,
      img: 'post-5.jpg',
      date: '25 February 2018',
      author: 'Dayle',
      comments: 8,
      categories: ['Learning', 'News', 'Health'],
      title: 'Tell me difference between smoke and vape',
      excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      tags: ['Travel', 'Culture', 'Place']
    }
  ];

  return (
    <div className="u-s-p-b-60">
      <div className="section__intro u-s-m-b-46">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__text-wrap">
                <h1 className="section__heading u-c-secondary u-s-m-b-12">LATEST FROM BLOG</h1>
                <span className="section__span u-c-silver">START YOU DAY WITH FRESH AND LATEST NEWS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section__content">
        <div className="container">
          <div className="row">
            {blogPosts.map(post => (
              <div key={post.id} className="col-lg-4 col-md-6 u-s-m-b-30">
                <div className="bp-mini bp-mini--img u-h-100">
                  <div className="bp-mini__thumbnail">
                    <a className="aspect aspect--bg-grey aspect--1366-768 u-d-block" href="blog-detail.html">
                      <img className="aspect__img" src={`images/blog/${post.img}`} alt={post.title} />
                    </a>
                  </div>
                  <div className="bp-mini__content">
                    <div className="bp-mini__stat">
                      <span className="bp-mini__stat-wrap">
                        <span className="bp-mini__publish-date">
                          <a><span>{post.date}</span></a>
                        </span>
                      </span>
                      <span className="bp-mini__stat-wrap">
                        <span className="bp-mini__preposition">By</span>
                        <span className="bp-mini__author">
                          <a href="#">{post.author}</a>
                        </span>
                      </span>
                      <span className="bp-mini__stat">
                        <span className="bp-mini__comment">
                          <a href="blog-detail.html">
                            <i className="far fa-comments u-s-m-r-4"></i>
                            <span>{post.comments}</span>
                          </a>
                        </span>
                      </span>
                    </div>
                    <div className="bp-mini__category">
                      {post.categories.map((category, index) => (
                        <a key={index}>{category}</a>
                      ))}
                    </div>
                    <span className="bp-mini__h1">
                      <a href="blog-detail.html">{post.title}</a>
                    </span>
                    <p className="bp-mini__p">{post.excerpt}</p>
                    <div className="blog-t-w">
                      {post.tags.map((tag, index) => (
                        <a key={index} className="gl-tag btn--e-transparent-hover-brand-b-2">{tag}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;