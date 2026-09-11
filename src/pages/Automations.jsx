export default function Automations({ automations, onNewAutomation, onOpenAutomation }) {
  return (
    <div className="page-stack">
      <section className="section-intro compact-intro">
        <div><span className="eyebrow">Workflow engine</span><h2>Automations</h2><p>Reduce repetitive work with lightweight client operations flows.</p></div>
        <button className="primary-button" onClick={onNewAutomation}>+ New automation</button>
      </section>

      <section className="automation-grid">
        {automations.map(auto => (
          <article className="automation-card panel" key={auto.id}>
            <div className="automation-head">
              <div><span className={`status-dot ${auto.status.toLowerCase()}`} /><h3>{auto.name}</h3></div>
              <span className={`automation-status ${auto.status.toLowerCase()}`}>{auto.status}</span>
            </div>
            <div className="automation-flow">
              {auto.steps.map((step, index) => (
                <div className="flow-step" key={`${auto.id}-${index}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                  {index < auto.steps.length - 1 && <i>↓</i>}
                </div>
              ))}
            </div>
            <div className="automation-footer">
              <span>{auto.lastRun ? `Last run ${auto.lastRun}` : auto.status === 'Draft' ? 'Not activated yet' : 'Last run 2h ago'}</span>
              <button onClick={() => onOpenAutomation(auto)}>Open workflow ↗</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
