import React from 'react';
import BlogPost from '../components/blog/BlogPost';
import BlogPagination from '../components/blog/BlogPagination';

const BlogSidebar = () => {
  // Dữ liệu bài viết blog (có thể fetch từ API hoặc state management)
  const blogPosts = [
    {
      id: 1,
      type: 'image',
      image: 'images/blog/post-2.jpg',
      publishDate: '25 February 2018',
      author: 'Dayle',
      commentCount: 8,
      categories: ['Learning', 'News', 'Health'],
      title: 'Life is an extraordinary Adventure',
      subtitle: 'A post with the image',
      tags: ['Travel', 'Culture', 'Place'],
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      socialLinks: true
    },
    {
      id: 2,
      type: 'gallery',
      images: [
        'images/blog/post-1.jpg',
        'images/blog/post-2.jpg', 
        'images/blog/post-3.jpg'
      ],
      publishDate: '25 March 2018',
      author: 'Admin',
      commentCount: 16,
      categories: ['Drawing', 'Design', 'Illustrator'],
      title: 'Everyone can draw but need passion for it',
      subtitle: 'A post with the gallery',
      tags: ['Creativity', 'Art', 'Design'],
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      socialLinks: true
    },
    {
      id: 3,
      type: 'audio-embed',
      audioEmbed: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/532448574&amp;color=%23333333&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true',
      publishDate: '25 April 2018',
      author: 'John',
      commentCount: 99,
      categories: ['Soundcloud', 'Lyrics'],
      title: 'EDM is only dance-floor oriented it has no emotions',
      subtitle: 'A post with the embed audio',
      tags: ['EDM', 'Trance'],
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      socialLinks: true
    },
    {
      id: 4,
      type: 'audio',
      audioFile: 'audio/1.mp3',
      publishDate: '25 June 2018',
      author: 'Doe',
      commentCount: 15,
      categories: ['Genre', 'Song'],
      title: 'Pop Genre only focusing on stupidity',
      subtitle: 'A post with the audio',
      tags: ['Pop'],
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      socialLinks: true
    },
    {
      id: 5,
      type: 'video',
      videoFile: 'video/video-sample.mp4',
      videoThumbnail: 'video/video-thumbnail.jpg',
      publishDate: '25 July 2018',
      author: 'Doe',
      commentCount: 56,
      categories: ['Video', 'Camera'],
      title: 'Save your movement on a camera',
      subtitle: 'A post with the video',
      tags: ['Camera', 'Recording'],
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      socialLinks: true
    },
    {
      id: 6,
      type: 'video-embed',
      videoEmbed: 'https://www.youtube.com/embed/qKqSBm07KZk',
      publishDate: '25 August 2018',
      author: 'John',
      commentCount: 4,
      categories: ['Youtube', 'Videos'],
      title: 'Oh No! 1 Trillion Videos',
      subtitle: 'A post with the embed video',
      tags: ['Recording', 'Freetime'],
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      socialLinks: true
    }
  ];

  return (
    <>
      <div className="u-s-p-y-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {blogPosts.map(post => (
                <BlogPost
                  key={post.id}
                  post={post}
                />
              ))}
              
              <nav className="post-center-wrap u-s-p-y-60">
                <BlogPagination />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSidebar;