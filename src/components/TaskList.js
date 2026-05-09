import React from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList({ tasks, onDeleteTask, onToggleComplete, onUpdateTask, categories }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks yet. Create your first task! 🎯</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      <div className="tasks-container">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
            onUpdate={onUpdateTask}
            categories={categories}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;