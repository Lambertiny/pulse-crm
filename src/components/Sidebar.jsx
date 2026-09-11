const items = [
  ['overview', 'Overview'],
  ['pipeline', 'Pipeline'],
  ['contacts', 'Contacts'],
  ['tasks', 'Tasks'],
  ['automations', 'Automations'],
  ['insights', 'Insights']
];

export default function Sidebar({ activePage, onNavigate, open, onClose, onSettings }) {
  return (
    <aside className={`sidebar ${open ? 'is-open' : ''}`}>
      <div className="brand-block">
        <div className="pulse-mark" aria-hidden="true"><span></span><i></i></div>
        <div>
          <strong>PULSE</strong>
          <small>Client Operations</small>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {items.map(([id, label]) => (
          <button
            key={id}
            className={activePage === id ? 'active' : ''}
            onClick={() => { onNavigate(id); onClose?.(); }}
          >
            <span className="nav-dot" />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="settings-button" onClick={onSettings}><span className="nav-dot" />Settings</button>
        <div className="workspace-card">
          <div className="avatar">JN</div>
          <div><strong>Juliana</strong><small>Creative Studio</small></div>
          <span>•••</span>
        </div>
      </div>
    </aside>
  );
}
