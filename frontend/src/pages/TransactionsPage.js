import React, { useState, useEffect } from 'react';
import api from '../api';
import ModalNumber from '../components/ModalNumber';

export default function TransactionsPage({ user }) {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('deposit');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/transactions/${user.id}`);
      setBalance(res.data.balance || 0);
      setTransactions((res.data.transactions || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      alert('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (type) => { setModalType(type); setShowModal(true); };

  const handleSubmit = async (amount) => {
    try {
      if (modalType === 'withdraw' && amount > balance) {
        return alert('Insufficient funds');
      }
      const path = modalType === 'deposit' ? 'deposit' : 'withdraw';
      await api.post(`/transactions/${user.id}/${path}`, { amount });
      await fetchData();
      setShowModal(false);
    } catch (err) {
      alert(err?.response?.data?.error || 'Operation failed');
    }
  };

  return (
    <div className="container" style={{ padding: 18 }}>
      {/* Top section with user info (no logout button now) */}
      <div className="topbar">
        <div className="username">
          Logged in as: <span className="username-highlight">{user?.name || 'Unknown'}</span>
        </div>
        <div className="role-actions">
          <div className="role-badge">Role: {user?.role || 'N/A'}</div>
        </div>
      </div>

      {/* Balance section */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Your Account</h3>
        <div className="balance-card" style={{ marginBottom: 12 }}>
          Balance: ₹{balance.toFixed(2)}
        </div>

        <div>
          <button className="btn-primary" onClick={() => openModal('deposit')}>+ Deposit</button>
          <button style={{ marginLeft: 8 }} onClick={() => openModal('withdraw')}>− Withdraw</button>
        </div>
      </div>

      {/* Transactions */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Transactions</h3>
        {loading ? (
          <div className="small">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="small muted" style={{ marginTop: 10 }}>No transactions found.</div>
        ) : (
          <div className="transactions" style={{ marginTop: 12 }}>
            {transactions.map(tx => (
              <div key={tx.id} className="tx-item">
                <div>
                  <div className="font-medium">{tx.type.toUpperCase()}</div>
                  <div className="small">{new Date(tx.createdAt).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="font-medium">₹{tx.amount.toFixed(2)}</div>
                  <div className="small muted">After: ₹{tx.balanceAfter.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ModalNumber
          title={modalType === 'deposit' ? 'Deposit' : 'Withdraw'}
          available={balance}
          onCancel={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
