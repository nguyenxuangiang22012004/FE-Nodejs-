import React from 'react';

const BlogPost = ({ post }) => {
  const renderMedia = () => {
    switch (post.type) {
      case 'image':
        return (
          <a className="aspect aspect--bg-grey aspect--1366-768 u-d-block" href="blog-detail.html">
            <img className="aspect__img" src={post.image} alt="" />
          </a>
        );
      
      case 'gallery':
        return (
          <div className="slider-fouc">
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
      
      case 'audio-embed':
        return (
          <iframe 
            src={post.audioEmbed}
            allow="autoplay"
            style={{ width: '100%', height: '166px' }}
          ></iframe>
        );
      
      case 'audio':
        return (
          <audio controls style={{ width: '100%' }}>
            <source src={post.audioFile} type="audio/mpeg" />
          </audio>
        );
      
      case 'video':
        return (
          <div className="post-video-block">
            <a className="post-video-link"></a>
            <video 
              className="post-video" 
              src={post.videoFile} 
              poster={post.videoThumbnail}
              controls
            ></video>
          </div>
        );
      
      case 'video-embed':
        return (
          <iframe 
            src={post.videoEmbed}
            allowFullScreen
            style={{ width: '100%', height: '400px' }}
          ></iframe>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`bp ${post.type === 'image' ? 'bp--img' : ''} u-s-m-b-30`}>
      <div className="bp__wrap">
        <div className="bp__thumbnail">
          {renderMedia()}
        </div>
        <div className="bp__info-wrap">
          <div className="bp__stat">
            <span className="bp__stat-wrap">
              <span className="bp__publish-date">
                <a href="blog-sidebar-none.html">
                  <span>{post.publishDate}</span>
                </a>
              </span>
            </span>
            
            <span className="bp__stat-wrap">
              <span className="bp__author">
                <a href="blog-sidebar-none.html">{post.author}</a>
              </span>
            </span>
            
            <span className="bp__stat-wrap">
              <span className="bp__comment">
                <a href="blog-detail.html">
                  <i className="far fa-comments u-s-m-r-4"></i>
                  <span>{post.commentCount}</span>
                </a>
              </span>
            </span>
            
            <span className="bp__stat-wrap">
              <span className="bp__category">
                {post.categories.map((category, index) => (
                  <a key={index} href="blog-sidebar-none.html">{category}</a>
                ))}
              </span>
            </span>
          </div>

          <span className="bp__h1">
            <a href="blog-detail.html">{post.title}</a>
          </span>
          
          <span className="bp__h2">{post.subtitle}</span>
          
          <div className="blog-t-w">
            {post.tags.map((tag, index) => (
              <a key={index} className="gl-tag btn--e-transparent-hover-brand-b-2" href="blog-sidebar-none.html">
                {tag}
              </a>
            ))}
          </div>
          
          <p className="bp__p">{post.content}</p>
          
          <div className="gl-l-r">
            <div>
              <span className="bp__read-more">
                <a href="blog-detail.html">READ MORE</a>
              </span>
            </div>
            
            {post.socialLinks && (
              <ul className="bp__social-list">
                <li>
                  <a className="s-fb--color" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a className="s-tw--color" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a className="s-insta--color" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a className="s-wa--color" href="#">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </li>
                <li>
                  <a className="s-gplus--color" href="#">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;