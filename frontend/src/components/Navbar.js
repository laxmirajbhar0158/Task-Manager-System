
import React from 'react';
import { useAuth } from '../AuthContext';
export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <div className="nav-inner">
        <h1 className="brand">Task Manager Pro</h1>
        <div>
          {user ? (
            <>
              <span className="nav-user">{user.avatar || '👤'} {user.username}</span>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <span className="small-muted">Please login or register</span>
          )}
        </div>
      </div>
    </header>
  );
}
