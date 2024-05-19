import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);

  // Récupérer les publications depuis l'API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Ajout du console.log() pour afficher les données récupérées
          setPosts(data); // 
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
  return (
    <div className="home-container">
      <h1>Welcome to Home</h1>
      {user && (
        <div className="user-info">
          Logged in as: {user.username}
        </div>
      )}
      <div className="posts-container">
        <h2>Posts</h2>
        {posts.map(post => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.image_url && (
              <img src={post.image_url} alt="Post Image" />
            )}
            <p>Written by User ID: {post.user_id}</p>
          </div>
        ))}
      </div>
      <Link to="/postdetails" className="btn btn-primary">Go to Post Details</Link>
    </div>
  );
};

export default Home;
