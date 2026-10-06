
import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import jsPDF from 'jspdf';
export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  async function load() { setLoading(true); setErr(null); try { const res = await getTasks(); setTasks(res.tasks || []); } catch (e) { setErr(e.message); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);
  async function addTask(data) { try { await createTask(data); await load(); } catch (e) { alert('Error: ' + e.message); } }
  async function onUpdate(id, updates) { try { await updateTask(id, updates); await load(); } catch (e) { alert('Error: ' + e.message); } }
  async function onDelete(id) { if (!window.confirm('Delete task?')) return; try { await deleteTask(id); await load(); } catch (e) { alert('Error: ' + e.message); } }
  function exportPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Task Manager Pro - Tasks', 14, 20);
    let y = 30;
    tasks.forEach((t, i) => {
      const line = `${i+1}. ${t.title} [${t.priority}] - ${t.status}`;
      doc.text(line, 14, y);
      y += 8;
      if (y > 270) { doc.addPage(); y = 20; }
    });
    doc.save('tasks.pdf');
  }
  return (
    <div className="card">
      <h3>Your Tasks</h3>
      <div style={{display:'flex', gap:8, marginBottom:8}}>
        <TaskForm onSubmit={addTask} />
        <button className="btn" onClick={exportPDF}>Export PDF</button>
      </div>
      {loading ? <p>Loading tasks...</p> : null}
      {err && <div className="error">{err}</div>}
      <div className="tasks-grid">
        {tasks.length === 0 && !loading ? <div className="muted">No tasks yet — create one!</div> : tasks.map(t=>(
          <TaskItem key={t.id} task={t} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
