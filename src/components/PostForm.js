import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../services/postServices';

const PostForm = ({ posts, setPosts, editingPost, setEditingPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      editPost();
    } else {
      addPost();
    }
    setTitle('');
    setBody('');
  };

  const addPost = () => {
    createPost({ title, body })
      .then((response) => {
        setPosts([...posts, response.data]);
        console.log('Post created:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  const editPost = () => {
    updatePost(editingPost.id, { title, body })
      .then((response) => {
        setPosts(
          posts.map((post) =>
            post.id === editingPost.id ? response.data : post
          )
        );
        console.log('Post updated:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Title</div>
      <input
        name="title"
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>Body</div>
      <textarea
        name="body"
        id="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div>
        <button type="submit">{editingPost ? 'Edit Post' : 'Add Post'}</button>
      </div>
    </form>
  );
};

export default PostForm;
