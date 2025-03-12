import React from 'react';
import axios from 'axios';

const BugList = ({ bugs, setBugs }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bugs/${id}`);
      setBugs(prev => prev.filter(bug => bug._id !== id));
    } catch (err) {
      console.error('Error deleting bug:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`/api/bugs/${id}`, { status: newStatus });
      setBugs(prev => prev.map(bug => 
        bug._id === id ? response.data : bug
      ));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div>
      <h2>Reported Bugs</h2>
      <ul>
        {bugs.map(bug => (
          <li key={bug._id}>
            <h3>{bug.title}</h3>
            <p>{bug.description}</p>
            <select 
              value={bug.status} 
              onChange={(e) => handleStatusChange(bug._id, e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <button onClick={() => handleDelete(bug._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugList;