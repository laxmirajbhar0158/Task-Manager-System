
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from './api';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  async function loadUser() {
    const token = localStorage.getItem('tm_token');
    if (!token) { setUser(null); setLoading(false); return; }
    try { const res = await api.getProfile(); setUser(res.user); } catch { localStorage.removeItem('tm_token'); setUser(null); }
    setLoading(false);
  }
  useEffect(() => { loadUser(); }, []);
  async function login(username, password) { const res = await api.login(username, password); if (res.token) localStorage.setItem('tm_token', res.token); setUser(res.user); return res; }
  async function register(username, password) { const res = await api.register(username, password); if (res.token) localStorage.setItem('tm_token', res.token); setUser(res.user); return res; }
  function logout() { localStorage.removeItem('tm_token'); setUser(null); }
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() { return useContext(AuthContext); }
