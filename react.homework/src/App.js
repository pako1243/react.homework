import React, { useState } from 'react';
import './App.css';

function Task({ task, onMoveToCompleted, onDelete }) {
  return (
    <div className="task">
      <span>{task}</span>
      <button onClick={onMoveToCompleted}>Finish</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

function TaskForm({ onSubmit }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onSubmit(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function App() {
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const handleAddTask = (task) => {
    setTodoList([...todoList, task]);
  };

  const handleMoveToCompleted = (taskIndex) => {
    const taskToMove = todoList[taskIndex];
    setTodoList(todoList.filter((_, index) => index !== taskIndex));
    setCompletedList([...completedList, taskToMove]);
  };

  const handleDeleteTask = (listType, taskIndex) => {
    if (listType === 'todo') {
      setTodoList(todoList.filter((_, index) => index !== taskIndex));
    } else if (listType === 'completed') {
      setCompletedList(completedList.filter((_, index) => index !== taskIndex));
    }
  };

  return (
    <div className="app">
      <div className="todo-column">
        <h2>To Do</h2>
        <TaskForm onSubmit={handleAddTask} />
        {todoList.map((task, index) => (
          <Task
            key={index}
            task={task}
            onMoveToCompleted={() => handleMoveToCompleted(index)}
            onDelete={() => handleDeleteTask('todo', index)}
          />
        ))}
      </div>
      <div className="completed-column">
        <h2>Completed</h2>
        {completedList.map((task, index) => (
          <Task
            key={index}
            task={task}
            onDelete={() => handleDeleteTask('completed', index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

