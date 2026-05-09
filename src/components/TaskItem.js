import React, { useState } from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task, onDelete, onToggleComplete, onUpdate, categories }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    onUpdate(task.id, editData);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffd93d';
      case 'low': return '#6bcf7f';
      default: return '#ccc';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`}></label>
      </div>

      <div className="task-content">
        {isEditing ? (
          <div className="task-edit-form">
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleEditChange}
              className="edit-input"
            />
            <textarea
              name="description"
              value={editData.description}
              onChange={handleEditChange}
              className="edit-textarea"
            />
            <div className="edit-row">
              <select
                name="category"
                value={editData.category}
                onChange={handleEditChange}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                name="priority"
                value={editData.priority}
                onChange={handleEditChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="edit-actions">
              <button onClick={handleSaveEdit} className="btn btn-small btn-success">Save</button>
              <button onClick={() => setIsEditing(false)} className="btn btn-small btn-cancel">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <div className="task-meta">
                <span 
                  className="task-priority" 
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {task.priority}
                </span>
                <span className="task-category">{task.category}</span>
              </div>
            </div>

            {task.description && (
              <p className="task-description">{task.description}</p>
            )}

            <div className="task-footer">
              {task.dueDate && (
                <span className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
                  📅 {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              {task.recurring !== 'none' && (
                <span className="task-recurring">🔄 {task.recurring}</span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="task-actions">
        {!isEditing && (
          <>
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn-icon" 
              title="Edit"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(task.id)} 
              className="btn-icon" 
              title="Delete"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;