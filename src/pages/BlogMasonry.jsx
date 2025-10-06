import React from 'react';
import BlogPost from '../components/blogmasonry/BlogPost';
import BlogPagination from '../components/blogmasonry/BlogPagination';

const BlogMasonry = () => {
  // Dữ liệu mẫu cho các bài blog
  const blogPosts = [
    {
      id: 1,
      image: "images/blog/post-2.jpg",
      date: "25 February 2018",
      author: "Dayle",
      comments: 8,
      categories: ["Learning", "News", "Health"],
      title: "Life is an extraordinary Adventure",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tags: ["Travel", "Culture", "Place"],
      type: "image"
    },
    {
      id: 2,
      images: ["images/blog/post-1.jpg", "images/blog/post-2.jpg", "images/blog/post-3.jpg"],
      date: "25 March 2018",
      author: "Admin",
      comments: 16,
      categories: ["Drawing", "Design", "Illustrator"],
      title: "Everyone can draw but need passion for it",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tags: ["Creativity", "Art", "Design"],
      type: "gallery"
    },
    {
      id: 3,
      soundcloudUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/532448574&amp;color=%23333333&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true",
      date: "25 April 2018",
      author: "John",
      comments: 99,
      categories: ["Soundcloud", "Lyrics"],
      title: "EDM is only dance-floor oriented it has no emotions",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tags: ["EDM", "Trance"],
      type: "soundcloud"
    },
    {
      id: 4,
      audioSrc: "audio/1.mp3",
      date: "25 June 2018",
      author: "Doe",
      comments: 15,
      categories: ["Genre", "Song"],
      title: "Pop Genre only focusing on stupidity",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tags: ["Pop"],
      type: "audio"
    },
    {
      id: 5,
      videoSrc: "video/video-sample.mp4",
      videoThumbnail: "video/video-thumbnail.jpg",
      date: "25 July 2018",
      author: "Doe",
      comments: 56,
      categories: ["Video", "Camera"],
      title: "Save your movement on a camera",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tags: ["Camera", "Recording"],
      type: "video"
    },
    {
      id: 6,
      youtubeUrl: "https://www.youtube.com/embed/qKqSBm07KZk",
      date: "25 August 2018",
      author: "John",
      comments: 4,
      categories: ["Youtube", "Videos"],
      title: "Oh No! 1 Trillion Videos",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tags: ["Recording", "Freetime"],
      type: "youtube"
    },
    // Thêm các bài blog khác ở đây...
  ];

  return (
    <>
      <div className="u-s-p-y-60">
        <div className="container">
          <div className="blog-m">
            <div className="row blog-m-init">
              {blogPosts.map(post => (
                <div key={post.id} className="blog-m__element">
                  <BlogPost post={post} />
                </div>
              ))}
            </div>
          </div>
          <nav className="post-center-wrap u-s-p-y-60">
            <BlogPagination />
          </nav>
        </div>
      </div>
    </>
  );
};

export default BlogMasonry;