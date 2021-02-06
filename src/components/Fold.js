import React, { useState } from 'react';
import './Fold.css';

function Fold({ children, title, show = false }) {
  const [open, setOpen] = useState(show);
  return (
    <div className="Fold post">
      <div
        className="post"
        onClick={() => setOpen(prev => !prev)}
        style={{
          textAlign: 'center',
          padding: '8px 16px',
          background: 'var(--bcg-header-clr)',
          cursor: 'pointer',
        }}
      >
        {title}
      </div>
      {open && children}
    </div>
  );
}

export default Fold;
