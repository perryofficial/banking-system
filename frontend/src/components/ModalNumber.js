import React, { useState } from 'react';

export default function ModalNumber({ title, available, onCancel, onSubmit }) {
  const [value, setValue] = useState('');

  const submit = () => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) return alert('Enter a valid amount');
    onSubmit(num);
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <div className="small">Available balance: ₹{available.toFixed(2)}</div>
        <div style={{ marginTop: 12 }}>
          <input
            className="input"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter amount"
            type="number"
          />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
          <button onClick={onCancel}>Cancel</button>
          <button className="btn-primary" onClick={submit}>{title}</button>
        </div>
      </div>
    </div>
  );
}
