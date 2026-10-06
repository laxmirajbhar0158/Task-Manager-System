
import React, { useState } from 'react';
export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('normal');
  async function submit(e) { e.preventDefault(); if (!title.trim()) return; await onSubmit({ title: title.trim(), priority, status: 'todo' }); setTitle(''); setPriority('normal'); }
  return (
    <form className="task-form" onSubmit={submit}>
      <input placeholder="Task title" value={title} onChange={e=>setTitle(e.target.value)} />
      <select value={priority} onChange={e=>setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <button className="btn" type="submit">Add</button>
    </form>
  );
}
