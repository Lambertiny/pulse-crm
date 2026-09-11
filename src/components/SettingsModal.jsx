export default function SettingsModal({ open, onClose, onReset }) {
  if (!open) return null;

  const reset = () => {
    if (!window.confirm('Restore the original Pulse demo data? This will replace the locally created demo items.')) return;
    onReset();
    onClose();
  };

  return (
    <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="create-modal settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div className="modal-head">
          <div><span className="eyebrow">Workspace</span><h2 id="settings-title">Settings</h2></div>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="settings-list">
          <div><span>Workspace</span><strong>Juliana · Creative Studio</strong></div>
          <div><span>Data storage</span><strong>Local browser storage</strong></div>
          <div><span>Product mode</span><strong>Portfolio prototype</strong></div>
        </div>

        <div className="settings-note">
          <strong>Local persistence is active.</strong>
          <p>Leads, tasks and automations created in this demo remain available after refreshing the browser.</p>
        </div>

        <div className="modal-actions settings-actions">
          <button type="button" className="danger-button" onClick={reset}>Restore demo data</button>
          <button type="button" className="primary-button" onClick={onClose}>Done</button>
        </div>
      </section>
    </div>
  );
}
