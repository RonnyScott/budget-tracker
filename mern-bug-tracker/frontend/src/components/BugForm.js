import React, { useState } from 'react';
import axios from 'axios';

const BugForm = ({ setBugs }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('medium');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bugs', { title, description, severity });
      setBugs(prev => [...prev, response.data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating bug:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Bug title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Bug description"
        required
      />
      <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Report Bug</button>
    </form>
  );
};

export default BugForm;