// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://crudapi.co.uk/v1/your-api-key';

const App = () => {
  const [bags, setBags] = useState([]);
  const [newBagName, setNewBagName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/bags`);
      setBags(response.data);
    } catch (error) {
      console.error('Error fetching bags:', error);
    }
  };

  const handleAddBag = async () => {
    try {
      const response = await axios.post(`${API_URL}/bags`, { name: newBagName, isCompleted: false });
      setBags([...bags, response.data]);
      setNewBagName('');
    } catch (error) {
      console.error('Error adding bag:', error);
    }
  };

  const handleToggleBagStatus = async (bagId, isCompleted) => {
    try {
      const response = await axios.patch(`${API_URL}/bags/${bagId}`, { isCompleted: !isCompleted });
      setBags(bags.map(bag => (bag.id === bagId ? response.data : bag)));
    } catch (error) {
      console.error('Error toggling bag status:', error);
    }
  };

  const handleDeleteBag = async (bagId) => {
    try {
      await axios.delete(`${API_URL}/bags/${bagId}`);
      setBags(bags.filter(bag => bag.id !== bagId));
    } catch (error) {
      console.error('Error deleting bag:', error);
    }
  };

  return (
    <div className="App">
      <h1>TODO List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter bag name"
          value={newBagName}
          onChange={(e) => setNewBagName(e.target.value)}
        />
        <button onClick={handleAddBag}>Add Bag</button>
      </div>
      <ul>
        {bags.map(bag => (
          <li key={bag.id} className={bag.isCompleted ? 'completed' : ''}>
            <span>{bag.name}</span>
            <input
              type="checkbox"
              checked={bag.isCompleted}
              onChange={() => handleToggleBagStatus(bag.id, bag.isCompleted)}
            />
            <button onClick={() => handleDeleteBag(bag.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

