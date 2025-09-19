import React, { useEffect, useState } from 'react';
import api from '../api';
import ModalNumber from '../components/ModalNumber';

export default function BankerAccountsPage({ user }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('deposit');

  const loadUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      alert('Failed to load users');
    }
  };

  const loadUser = async (uid) => {
    try {
      const res = await api.get(`/users/${uid}`);
      setSelectedUser(res.data);
      const txs = res.data.Accounts || [];
      const sortedTxs = txs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTransactions(sortedTxs);
      setBalance(sortedTxs.length ? sortedTxs[0].balanceAfter : 0);
    } catch (err) {
      alert('Failed to load user details');
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const openModal = (type) => { setModalType(type); setShowModal(true); };

  const handleSubmit = async (amount) => {
    try {
      if (!selectedUser) return alert('Select a user first');
      if (modalType === 'withdraw' && amount > balance) return alert('Insufficient funds');

      const path = modalType === 'deposit' ? 'deposit' : 'withdraw';
      await api.post(`/transactions/${selectedUser.id}/${path}`, { amount });
      await loadUser(selectedUser.id);
      await loadUsers();
      setShowModal(false);
    } catch (err) {
      alert(err?.response?.data?.error || 'Operation failed');
    }
  };

  return (
    <div className="container" style={{ padding: 18 }}>
      {/* Top bar without logout button */}
      <div className="topbar">
        <div className="username">
          Logged in as: <span className="username-highlight">{user?.name || 'Unknown'}</span>
        </div>
        <div className="role-actions">
          <div className="role-badge">Role: {user?.role || 'N/A'}</div>
        </div>
      </div>

      <div className="content" style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        <div style={{ flex: 1 }}>
          <h3>Customer Accounts</h3>
          <div className="list">
            {users.length === 0 ? (
              <div className="small">No users found</div>
            ) : (
              users.map(u => (
                <div
                  key={u.id}
                  className="list-item"
                  style={{
                    cursor: 'pointer',
                    background: selectedUser?.id === u.id ? '#f1f5f9' : 'white'
                  }}
                  onClick={() => loadUser(u.id)}
                >
                  <div>
                    <strong>{u.name}</strong>
                    <div className="small">{u.email}</div>
                  </div>
                  <div className="small">ID: {u.id}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h3>{selectedUser ? selectedUser.name : 'No User Selected'}</h3>
          {selectedUser && (
            <>
              <div className="balance-card" style={{ marginBottom: 12 }}>
                Balance: <strong>₹{balance.toFixed(2)}</strong>
              </div>

              {/* Only show deposit/withdraw for non-bankers */}
              {user.role !== 'banker' && selectedUser && (
                <div style={{ marginTop: 12 }}>
                  <button className="btn-primary" onClick={() => openModal('deposit')}>Deposit</button>
                  <button style={{ marginLeft: 8 }} onClick={() => openModal('withdraw')}>Withdraw</button>
                </div>
              )}

              <div className="list">
                {transactions.length === 0 ? (
                  <div className="small">No transactions</div>
                ) : (
                  transactions.map(tx => (
                    <div key={tx.id} className="list-item">
                      <div>
                        <strong>{tx.type.toUpperCase()}</strong>
                        <div className="small">{new Date(tx.createdAt).toLocaleString()}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div>₹{tx.amount.toFixed(2)}</div>
                        <div className="small">After: ₹{tx.balanceAfter.toFixed(2)}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
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
