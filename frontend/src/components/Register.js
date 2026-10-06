
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
export default function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  async function onSubmit(e) {
    e.preventDefault(); setErr(null); setBusy(true);
    try { await register(username.trim(), password); setUsername(''); setPassword(''); } catch (err) { setErr(err.message); } finally { setBusy(false); }
  }
  return (
    <form className="card auth-card" onSubmit={onSubmit}>
      <h3>Register</h3>
      {err && <div className="error">{err}</div>}
      <label>Username</label>
      <input value={username} onChange={e=>setUsername(e.target.value)} required />
      <label>Password</label>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button className="btn" disabled={busy}>{busy ? 'Creating...' : 'Create account'}</button>
    </form>
  );
}
