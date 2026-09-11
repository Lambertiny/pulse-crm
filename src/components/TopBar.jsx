export default function TopBar({ pageTitle, onMenu, onNewLead, onSearch, onNotifications }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={onMenu} aria-label="Open menu">☰</button>
        <div>
          <span className="eyebrow">Pulse / {pageTitle}</span>
          <h1>{pageTitle}</h1>
        </div>
      </div>
      <div className="topbar-actions">
        <button className="search-button" onClick={onSearch}>⌕ <span>Search</span><kbd>⌘K</kbd></button>
        <button className="icon-button" onClick={onNotifications} aria-label="Notifications" title="Notifications">●</button>
        <button className="primary-button" onClick={onNewLead}>+ New lead</button>
      </div>
    </header>
  );
}
