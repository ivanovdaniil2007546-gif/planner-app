import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CategoryFilter from './components/CategoryFilter';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState(['Work', 'Personal', 'Shopping', 'Health']);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      category: taskData.category,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      completed: false,
      recurring: taskData.recurring,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id, updatedData) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedData } : task));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter !== 'all' && filter !== 'priority') {
      filtered = filtered.filter(task => task.category === filter);
    }

    return filtered.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📅 Task Planner</h1>
        <p>Stay organized and productive</p>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="left-panel">
            <TaskForm onAddTask={addTask} categories={categories} />
            <CategoryFilter 
              categories={categories} 
              onFilterChange={setFilter}
              currentFilter={filter}
            />
          </div>

          <div className="right-panel">
            <TaskList
              tasks={getFilteredTasks()}
              onDeleteTask={deleteTask}
              onToggleComplete={toggleComplete}
              onUpdateTask={updateTask}
              categories={categories}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;