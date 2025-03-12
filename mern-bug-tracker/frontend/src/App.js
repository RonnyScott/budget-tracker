import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error }) => (
  <div>
    <h2>Something went wrong:</h2>
    <p>{error.message}</p>
  </div>
);

function App() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axios.get('/api/bugs');
        setBugs(response.data);
      } catch (err) {
        console.error('Error fetching bugs:', err);
      }
    };
    fetchBugs();
  }, []);

  return (
    <div className="App">
      <h1>Bug Tracker</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BugForm setBugs={setBugs} />
        <BugList bugs={bugs} setBugs={setBugs} />
      </ErrorBoundary>
    </div>
  );
}

export default App;