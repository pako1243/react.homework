import React, { useState, useEffect } from 'react';
import { useLocalStorage, useWindowSize } from './hooks';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsDesktop(width > 768); 
  }, [width]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (isDesktop) {
      if (darkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode, isDesktop]);

  return (
    <div className="App">
      {isDesktop && (
        <button onClick={toggleTheme} className="toggle-button">
          Toggle Theme
        </button>
      )}
      <h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
    </div>
  );
};

export default App;
