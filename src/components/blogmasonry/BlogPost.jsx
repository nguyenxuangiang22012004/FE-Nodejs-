import React from 'react';

const BlogPost = ({ post }) => {
  const renderMedia = () => {
    switch (post.type) {
      case 'image':
        return (
          <div className="bp-mini__thumbnail">
            <a className="aspect aspect--bg-grey aspect--1366-768 u-d-block" href="blog-detail.html">
              <img className="aspect__img" src={post.image} alt="" />
            </a>
          </div>
        );
      
      case 'gallery':
        return (
          <div className="bp-mini__thumbnail">
            <div className="owl-carousel post-gallery">
              {post.images.map((image, index) => (
                <div key={index}>
                  <a href="blog-detail.html">
                    <img className="u-img-fluid" src={image} alt="" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'soundcloud':
        return (
          <div className="bp-mini__thumbnail">
            <iframe src={post.soundcloudUrl}></iframe>
          </div>
        );
      
      case 'audio':
        return (
          <div className="bp-mini__thumbnail">
            <audio controls>
              <source src={post.audioSrc} />
            </audio>
          </div>
        );
      
      case 'video':
        return (
          <div className="bp-mini__thumbnail">
            <div className="post-video-block">
              <a className="post-video-link"></a>
              <video className="post-video" src={post.videoSrc} poster={post.videoThumbnail}></video>
            </div>
          </div>
        );
      
      case 'youtube':
        return (
          <div className="bp-mini__thumbnail">
            <iframe src={post.youtubeUrl} allowFullScreen></iframe>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`bp-mini ${post.type === 'image' ? 'bp-mini--img' : ''}`}>
      {renderMedia()}
      <div className="bp-mini__content">
        <div className="bp-mini__stat">
          <span className="bp-mini__stat-wrap">
            <span className="bp-mini__publish-date">
              <a href="blog-masonry.html">
                <span>{post.date}</span>
              </a>
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
            <a key={index} href="blog-masonry.html">{category}</a>
          ))}
        </div>
        <span className="bp-mini__h1">
          <a href="blog-detail.html">{post.title}</a>
        </span>
        <p className="bp-mini__p">{post.description}</p>
        <div className="blog-t-w">
          {post.tags.map((tag, index) => (
            <a key={index} className="gl-tag btn--e-transparent-hover-brand-b-2" href="blog-masonry.html">
              {tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;