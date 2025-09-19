import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import TransactionsPage from './pages/TransactionsPage';
import BankerAccountsPage from './pages/BankerAccountsPage';
import Header from './components/Header';

export default function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  if (!user) return <LoginPage onLogin={setUser} />;

  return (
    <div>
      <Header user={user} onLogout={() => { localStorage.removeItem('authToken'); localStorage.removeItem('user'); setUser(null); }} />
      {user.role === 'banker' ? <BankerAccountsPage user={user} /> : <TransactionsPage user={user} />}
    </div>
  );
}
