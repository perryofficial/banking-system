import React from 'react';

export default function Header({ onLogout, showLogout = true }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#2563eb',
        color: 'white',
        padding: '14px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}
    >
      {/* Title Centered */}
      <h2
        style={{
          margin: 0,
          fontSize: '1.6rem',
          fontWeight: '600',
          textAlign: 'center',
          flex: 1
        }}
      >
        Banking System
      </h2>

      {/* Logout Button (Optional) */}
      {showLogout && (
        <button
          onClick={async () => {
            try {
              await fetch(
                (process.env.REACT_APP_API_BASE || 'http://localhost:5000') +
                  '/api/auth/logout',
                {
                  method: 'POST',
                  headers: { Authorization: localStorage.getItem('authToken') }
                }
              );
            } catch (e) {
              /* ignore */
            }
            onLogout();
          }}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 14px',
            cursor: 'pointer',
            fontWeight: '500',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            marginLeft: '20px'
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}
