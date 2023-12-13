
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostDetail.css'; // Import your CSS file
import { Link, useParams } from 'react-router-dom';

const PostDetail = ({ match }) => {
  const [post, setPost] = useState(null);
  let { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://hn.algolia.com/api/v1/items/${postId}`);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchData();
  }, [postId]);

  const renderChildren = () => {
    if (!post || !post.children || post.children.length === 0) {
      return null;
    }

    const childrenSlice = post.children.slice(0, 16);

    return (
      <div className="children-container">
        {childrenSlice.map((child) => (
          <div key={child.id} className="child-post">
            <h3>
              <Link to={`/post/${child.id}`}>{child.title}</Link>
            </h3>
            <p>{child.text}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {post && (
        <div className="post-detail">
          <h2>{post.title}</h2>
          <p>{post.author}</p>
          <p>{new Date(post.created_at).toLocaleDateString()}</p>
          <p>{post.points} points</p>
          <p>{post.num_comments} comments</p>
          <p>{post.url}</p>
          <div className="post-text" dangerouslySetInnerHTML={{ __html: post.text }} />
          {renderChildren()}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
