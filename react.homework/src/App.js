import React, { useState } from 'react';
import './App.css';

const Task = ({ content, onAction }) => {
  return (
    <div className="task">
      <span>{content}</span>
      <button onClick={onAction}>Move</button>
    </div>
  );
};

const Column = ({ title, tasks, onMoveTask }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task key={index} content={task.content} onAction={() => onMoveTask(task.id)} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, content: 'Task 1', column: 'todo' },
    { id: 2, content: 'Task 2', column: 'todo' },
    { id: 3, content: 'Task 3', column: 'inProgress' },
    { id: 4, content: 'Task 4', column: 'completed' },
  ]);

  const moveTask = (taskId, targetColumn) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, column: targetColumn };
        }
        return task;
      })
    );
  };

  const todoTasks = tasks.filter((task) => task.column === 'todo');
  const inProgressTasks = tasks.filter((task) => task.column === 'inProgress');
  const completedTasks = tasks.filter((task) => task.column === 'completed');

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="columns">
        <Column title="To Do" tasks={todoTasks} onMoveTask={(taskId) => moveTask(taskId, 'inProgress')} />
        <Column title="In Progress" tasks={inProgressTasks} onMoveTask={(taskId) => moveTask(taskId, 'completed')} />
        <Column title="Completed" tasks={completedTasks} onMoveTask={(taskId) => moveTask(taskId, 'todo')} />
      </div>
    </div>
  );
};

export default App;
