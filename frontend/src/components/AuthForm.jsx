import React, { useState } from 'react'
import { login, register } from '../api'
import { useNavigate } from 'react-router-dom'

export default function AuthForm({ onAuth }){
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username:'', password:'' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault(); setErr('');
    try{
      if (mode === 'login'){
        const data = await login(form);
        localStorage.setItem('tw_token', data.token);
        localStorage.setItem('tw_user', JSON.stringify(data.user));
        window.location.href = '/';
      } else {
        await register(form);
        setMode('login');
      }
    } catch (e){ setErr(e?.response?.data?.error || 'Failed'); }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">{mode === 'login' ? 'Login' : 'Register'}</h2>
      {err && <div className="bg-red-100 text-red-700 p-2 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input required placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} className="w-full p-2 border rounded" />
        <input required type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full p-2 border rounded" />
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">{mode === 'login' ? 'Login' : 'Register'}</button>
          <button type="button" onClick={()=>setMode(mode==='login'?'register':'login')} className="px-4 py-2 border rounded">Switch</button>
        </div>
      </form>
    </div>
  )
}
