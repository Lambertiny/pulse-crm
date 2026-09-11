import { useMemo, useState } from 'react';
import ScoreBadge from '../components/ScoreBadge';

export default function Contacts({ leads, onOpenLead }) {
  const [query, setQuery] = useState('');
  const [stage, setStage] = useState('all');
  const rows = useMemo(() => leads.filter(lead => {
    const text = `${lead.name} ${lead.company} ${lead.project}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (stage === 'all' || lead.stage === stage);
  }), [leads, query, stage]);

  return (
    <div className="page-stack">
      <section className="section-intro compact-intro"><div><span className="eyebrow">Relationship data</span><h2>Contacts</h2><p>Every lead, project and next step in one searchable view.</p></div></section>
      <section className="panel contacts-panel">
        <div className="table-toolbar">
          <label className="table-search">⌕ <input data-global-search value={query} onChange={event => setQuery(event.target.value)} placeholder="Search contacts or companies" /></label>
          <select value={stage} onChange={event => setStage(event.target.value)}>
            <option value="all">All stages</option><option value="new">New</option><option value="qualified">Qualified</option><option value="proposal">Proposal</option><option value="negotiation">Negotiation</option><option value="won">Won</option>
          </select>
        </div>
        <div className="contact-table-wrap">
          <table className="contact-table">
            <thead><tr><th>Client</th><th>Project</th><th>Stage</th><th>Score</th><th>Value</th><th>Last activity</th></tr></thead>
            <tbody>{rows.map(lead => (
              <tr key={lead.id} onClick={() => onOpenLead(lead)}>
                <td><div className="client-cell"><div className="avatar">{lead.name.split(' ').map(name => name[0]).join('').slice(0, 2)}</div><div><strong>{lead.name}</strong><span>{lead.company}</span></div></div></td>
                <td>{lead.project}</td><td><span className="stage-pill">{lead.stage}</span></td><td><ScoreBadge lead={lead}/></td><td>€{lead.value.toLocaleString()}</td><td>{lead.lastActivity}</td>
              </tr>
            ))}</tbody>
          </table>
          {!rows.length && <div className="empty-state">No contacts match your search.</div>}
        </div>
      </section>
    </div>
  );
}
