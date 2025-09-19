import React, { useState } from 'react';
import api from '../api';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
    } catch (err) {
      alert(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    try {
      setLoading(true);
      const name = email.split('@')[0] || 'User';
      await api.post('/auth/register', { name, email, password, role });
      alert('Registration successful! Please login.');
    } catch (err) {
      alert(err?.response?.data?.error || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f3f4f6',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
          padding: '30px 28px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '6px', fontSize: '1.8rem', fontWeight: '600' }}>
          Banking System
        </h2>
        <p style={{ marginBottom: 24, fontSize: '0.9rem', color: '#6b7280' }}>
          Login or create a new account
        </p>

        <div style={{ display: 'grid', gap: 16 }}>
          <input
            className="input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input"
            style={{
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              background: '#fff',
            }}
          >
            <option value="customer">Customer</option>
            <option value="banker">Banker</option>
          </select>

          <button
            className="btn-primary"
            onClick={login}
            disabled={loading}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.2s ease',
            }}
          >
            {loading ? 'Please wait...' : 'Login'}
          </button>

          <button
            onClick={register}
            disabled={loading}
            style={{
              background: '#e5e7eb',
              color: '#111827',
              border: 'none',
              borderRadius: '6px',
              padding: '12px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: '0.2s ease',
            }}
          >
            {loading ? 'Please wait...' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
