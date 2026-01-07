import React, { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import AuthForm from './components/AuthForm'

export default function App(){
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('tw_user');
    return raw ? JSON.parse(raw) : null;
  });

  function logout(){
    localStorage.removeItem('tw_token');
    localStorage.removeItem('tw_user');
    setUser(null);
    navigate('/');
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">TripWhiz</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-blue-600">Home</Link>
          {user ? (
            <>
              <span className="text-gray-700">{user.username}</span>
              <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/auth" className="text-blue-600">Login / Register</Link>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/auth" element={<AuthForm onAuth={(u, token)=>{ localStorage.setItem('tw_token', token); localStorage.setItem('tw_user', JSON.stringify(u)); window.location.href='/' }} />} />
      </Routes>
    </div>
  )
}
