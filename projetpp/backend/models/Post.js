const db = require('../config/db');

exports.createPost = async (title, content, image_url, user_id, jeu_id) => {
  try {
    const query = 'INSERT INTO posts (title, content, image_url, user_id, jeu_id) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [title, content, image_url, user_id, jeu_id]);
    const postId = result.insertId;
    return postId;
  } catch (err) {
    console.error('Erreur lors de la création de la publication :', err);
    throw err;
  }
};
const db = require('../config/db');

exports.getAllPosts = async () => {
  try {
    const query = 'SELECT * FROM posts';
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (err) {
    console.error('Erreur lors de la récupération des publications depuis la base de données :', err);
    throw err;
  }
};
