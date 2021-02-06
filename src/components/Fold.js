import React, { useState } from 'react';
import './Fold.css';

function Fold({ children, title }) {
  const [open, setOpen] = useState(false);
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
