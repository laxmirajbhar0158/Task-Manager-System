
import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import AdminPanel from './components/AdminPanel';

function MainApp() {
  const { user } = useAuth();

  return (
    <div className="app">
      <Navbar />
      <main className="container">
        {!user ? (
          <div className="auth-grid">
            <Login />
            <Register />
          </div>
        ) : (
          <>
            <h2>Welcome, {user.username} 👋</h2>
            <Settings />
            <TaskList />
            {user.username === 'Abhii' && <AdminPanel />}
          </>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
