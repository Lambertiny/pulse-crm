import ScoreBadge from './ScoreBadge';

export default function LeadDrawer({ lead, onClose }) {
  if (!lead) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="lead-drawer" onClick={event => event.stopPropagation()} aria-label={`${lead.name} lead profile`}>
        <div className="drawer-top">
          <span className="eyebrow">Lead profile</span>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="drawer-title">
          <div className="avatar large">{lead.name.split(' ').map(name => name[0]).join('').slice(0, 2)}</div>
          <div><h2>{lead.name}</h2><p>{lead.company}</p></div>
        </div>
        <ScoreBadge lead={lead} />
        <div className="drawer-grid">
          <div className="drawer-email"><small>Email</small><strong>{lead.email || 'Not provided'}</strong></div>
          <div><small>Project value</small><strong>€{lead.value.toLocaleString()}</strong></div>
          <div><small>Stage</small><strong>{lead.stage}</strong></div>
          <div><small>Source</small><strong>{lead.source}</strong></div>
          <div><small>Project</small><strong>{lead.project}</strong></div>
        </div>
        <div className="drawer-section">
          <h3>Recent activity</h3>
          <ul className="activity-timeline">
            <li><span>Today</span><div><strong>Proposal reviewed</strong><p>Client opened the latest proposal.</p></div></li>
            <li><span>Yesterday</span><div><strong>Discovery call</strong><p>Project objectives and scope were discussed.</p></div></li>
            <li><span>Sep 08</span><div><strong>Lead qualified</strong><p>Budget and timeline confirmed.</p></div></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
