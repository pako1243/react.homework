import React, { useState, useCallback } from 'react';
import './App.css';

const Task = React.memo(({ content, onAction }) => {
  return (
    <li>
      {content}
      <button onClick={onAction}>Action</button>
    </li>
  );
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddTask = useCallback((taskContent) => {
    setTasks((prevTasks) => [...prevTasks, taskContent]);
  }, []);

  const handleDeleteTask = useCallback((index, column) => {
    if (column === 'todo') {
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    } else if (column === 'completed') {
      setCompletedTasks((prevCompletedTasks) => prevCompletedTasks.filter((_, i) => i !== index));
    }
  }, []);

  const handleMoveTask = useCallback(
    (index, fromColumn, toColumn) => {
      if (toColumn === 'completed') {
        setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, tasks[index]]);
        handleDeleteTask(index, fromColumn);
      } else if (toColumn === 'todo') {
        setTasks((prevTasks) => [...prevTasks, completedTasks[index]]);
        handleDeleteTask(index, fromColumn);
      }
    },
    [tasks, completedTasks, handleDeleteTask]
  );

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="columns">
        <div className="column">
          <h2>To Do</h2>
          <ul>
            {tasks.map((task, index) => (
              <Task key={index} content={task} onAction={() => handleMoveTask(index, 'todo', 'completed')} />
            ))}
          </ul>
          <input
            type="text"
            placeholder="Enter new task"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTask(e.target.value);
                e.target.value = '';
              }
            }}
          />
        </div>
        <div className="column">
          <h2>Completed</h2>
          <ul>
            {completedTasks.map((task, index) => (
              <Task key={index} content={task} onAction={() => handleMoveTask(index, 'completed', 'todo')} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
