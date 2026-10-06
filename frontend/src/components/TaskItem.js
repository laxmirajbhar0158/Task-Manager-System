
import React from 'react';
import dayjs from 'dayjs';
export default function TaskItem({ task, onUpdate, onDelete }) {
  const when = task.updatedAt ? dayjs(task.updatedAt).format('MMM D, YYYY HH:mm') : '';
  return (
    <div className={`task-item ${task.priority === 'high' ? 'high' : ''}`}>
      <div className="task-main">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">{task.priority} • {task.status} • {when}</div>
      </div>
      <div className="task-actions">
        {task.status !== 'completed' && <button className="small" onClick={()=>onUpdate(task.id,{ status: 'completed' })}>Complete</button>}
        {task.status === 'completed' && <button className="small" onClick={()=>onUpdate(task.id,{ status: 'todo' })}>Reopen</button>}
        <button className="small danger" onClick={()=>onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
