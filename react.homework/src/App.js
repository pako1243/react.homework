import React, { useState, useMemo } from 'react';
import './App.css';

const Task = React.memo(({ content, onMoveToCompleted, onDelete }) => {
  return (
    <li>
      {content}
      <button onClick={onMoveToCompleted}>Finish</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddTask = (taskContent) => {
    setTasks([...tasks, { content: taskContent }]);
  };

  const handleDeleteTask = (index, column) => {
    if (column === 'todo') {
      setTasks(tasks.filter((_, i) => i !== index));
    } else if (column === 'completed') {
      setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    }
  };

  const handleMoveToCompleted = (index) => {
    const taskToMove = tasks[index];
    setCompletedTasks([...completedTasks, taskToMove]);
    handleDeleteTask(index, 'todo');
  };

  const handleMoveToToDo = (index) => {
    const taskToMove = completedTasks[index];
    setTasks([...tasks, taskToMove]);
    handleDeleteTask(index, 'completed');
  };

  const memoizedTasks = useMemo(
    () =>
      tasks.map((task, index) => (
        <Task
          key={index}
          content={task.content}
          onMoveToCompleted={() => handleMoveToCompleted(index)}
          onDelete={() => handleDeleteTask(index, 'todo')}
        />
      )),
    [tasks, handleMoveToCompleted, handleDeleteTask]
  );

  const memoizedCompletedTasks = useMemo(
    () =>
      completedTasks.map((task, index) => (
        <Task
          key={index}
          content={task.content}
          onMoveToCompleted={() => handleMoveToToDo(index)}
          onDelete={() => handleDeleteTask(index, 'completed')}
        />
      )),
    [completedTasks, handleMoveToToDo, handleDeleteTask]
  );

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="columns">
        <div className="column">
          <h2>To Do</h2>
          <ul>{memoizedTasks}</ul>
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
          <ul>{memoizedCompletedTasks}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
