export default function WorkflowDrawer({ automation, onClose }) {
  if (!automation) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="lead-drawer workflow-drawer" onClick={event => event.stopPropagation()} aria-label={`${automation.name} workflow`}>
        <div className="drawer-top">
          <span className="eyebrow">Workflow detail</span>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="workflow-title">
          <span className="status-dot" />
          <div>
            <h2>{automation.name}</h2>
            <span className={`automation-status ${automation.status.toLowerCase()}`}>{automation.status}</span>
          </div>
        </div>

        <div className="workflow-summary">
          <div><small>Steps</small><strong>{automation.steps.length}</strong></div>
          <div><small>Last run</small><strong>{automation.lastRun || (automation.status === 'Draft' ? 'Never' : '2h ago')}</strong></div>
        </div>

        <div className="drawer-section">
          <h3>Workflow sequence</h3>
          <div className="workflow-sequence">
            {automation.steps.map((step, index) => (
              <div className="workflow-sequence-row" key={`${automation.id}-${index}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
                {index < automation.steps.length - 1 && <i>↓</i>}
              </div>
            ))}
          </div>
        </div>

        <p className="prototype-note">Portfolio prototype: this panel demonstrates workflow structure and interaction design. A production build could connect each step to CRM, email or automation services.</p>
      </aside>
    </div>
  );
}
