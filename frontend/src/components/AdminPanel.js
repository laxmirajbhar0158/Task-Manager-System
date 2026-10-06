
import React, { useState } from 'react';
import { adminGetUsers } from '../api';
export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [adminKey, setAdminKey] = useState('');
  const [err, setErr] = useState(null);
  async function loadUsers() { setErr(null); try { const res = await adminGetUsers(adminKey); if (res.users) setUsers(res.users); else setErr('Unexpected response'); } catch (e) { setErr(e.message); } }
  return (
    <div className="card" style={{marginTop:12}}>
      <h4>Admin Panel</h4>
      <div style={{display:'flex', gap:8, marginBottom:8}}>
        <input placeholder="Admin Key" value={adminKey} onChange={e=>setAdminKey(e.target.value)} />
        <button className="btn" onClick={loadUsers}>Load users</button>
      </div>
      {err && <div className="error">{err}</div>}
      <div>
        {users.map(u => (
          <div key={u.username} style={{padding:8, borderBottom:'1px solid #eee'}}>
            <strong>{u.username}</strong> — tasks: {u.taskCount}, completed: {u.completedTasks}
          </div>
        ))}
      </div>
    </div>
  );
}
