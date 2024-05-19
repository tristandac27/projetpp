import React, { useState } from 'react';

const PostDetail = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // Ajoutez un état pour stocker l'image sélectionnée

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        content,
        image_url: '',
        user_id: 1, // Remplacez par l'ID de l'utilisateur approprié
        jeu_id: 1, // Remplacez par l'ID du jeu approprié
      };
  
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Indique que vous envoyez des données JSON
        },
        body: JSON.stringify(data), // Convertit l'objet data en chaîne JSON
      });
  
      if (response.ok) {
        console.log('Post created successfully');
        setTitle('');
        setContent('');
        setImage(null);
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Mettez à jour l'état de l'image avec le fichier sélectionné

    // Affichez l'URL de l'image dans la console
    console.log('Selected image URL:', URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} /> {/* Ajoutez un champ pour sélectionner une image */}
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostDetail;
