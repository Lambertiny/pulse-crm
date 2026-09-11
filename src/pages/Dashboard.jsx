import StatCard from '../components/StatCard';
import MiniChart from '../components/MiniChart';
import ScoreBadge, { getScore } from '../components/ScoreBadge';
import { activities, stageMeta } from '../data/mockData';

export default function Dashboard({ leads, tasks, onOpenLead, onNavigate }) {
  const activeLeads = leads.filter(lead => lead.stage !== 'won');
  const pipelineValue = activeLeads.reduce((sum, lead) => sum + lead.value, 0);
  const proposals = leads.filter(lead => lead.stage === 'proposal').length;
  const won = leads.filter(lead => lead.stage === 'won').length;
  const conversion = Math.round((won / Math.max(leads.length, 1)) * 100);
  const stageValues = stageMeta.map(stage => leads.filter(lead => lead.stage === stage.id).reduce((sum, lead) => sum + lead.value, 0));
  const hottest = [...activeLeads].sort((a, b) => getScore(b) - getScore(a)).slice(0, 3);
  const openTasks = tasks.filter(task => !task.completed).length;
  const highValueProposals = leads.filter(lead => lead.stage === 'proposal' && lead.value >= 4000);
  const highValueProposalTotal = highValueProposals.reduce((sum, lead) => sum + lead.value, 0);
  const referrals = leads.filter(lead => lead.source === 'Referral').length;

  const now = new Date();
  const dateLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(now);
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="page-stack">
      <section className="welcome-row">
        <div><span className="eyebrow">{dateLabel}</span><h2>{greeting}, Juliana.</h2><p>Your pipeline needs attention. <strong>{openTasks} tasks</strong> are still open.</p></div>
        <button className="ghost-button" onClick={() => onNavigate('pipeline')}>Open pipeline ↗</button>
      </section>

      <section className="stats-grid">
        <StatCard label="Active leads" value={activeLeads.length} delta="Live pipeline count" />
        <StatCard label="Proposals" value={proposals} delta={`${proposals} currently in proposal`} />
        <StatCard label="Pipeline value" value={`€${(pipelineValue / 1000).toFixed(1)}k`} delta="Active opportunity value" accent />
        <StatCard label="Conversion" value={`${conversion}%`} delta={`${won} closed ${won === 1 ? 'project' : 'projects'}`} />
      </section>

      <section className="dashboard-grid">
        <article className="panel pipeline-panel">
          <div className="panel-head"><div><span className="eyebrow">Revenue</span><h3>Pipeline overview</h3></div><button onClick={() => onNavigate('insights')}>View insights ↗</button></div>
          <MiniChart values={stageValues} labels={stageMeta.map(stage => stage.label)} />
          <div className="pipeline-summary">
            {stageMeta.map((stage, index) => <div key={stage.id}><span>{stage.label}</span><strong>€{stageValues[index].toLocaleString()}</strong></div>)}
          </div>
        </article>

        <article className="panel ai-panel">
          <div className="panel-head"><div><span className="eyebrow">Pulse intelligence</span><h3>AI insights</h3></div><span className="live-pill">LIVE</span></div>
          <div className="insight-card"><span>01</span><div><strong>North Studio has been inactive for 6 days.</strong><p>Recommended action: send a concise follow-up today.</p></div></div>
          <div className="insight-card"><span>02</span><div><strong>{highValueProposals.length} high-value {highValueProposals.length === 1 ? 'lead is' : 'leads are'} waiting on proposals.</strong><p>Potential pipeline value: €{highValueProposalTotal.toLocaleString()}.</p></div></div>
          <div className="insight-card"><span>03</span><div><strong>{referrals} referral {referrals === 1 ? 'lead is' : 'leads are'} active in your CRM.</strong><p>Referral opportunities are currently among the strongest-scoring records.</p></div></div>
        </article>
      </section>

      <section className="dashboard-grid lower-grid">
        <article className="panel">
          <div className="panel-head"><div><span className="eyebrow">Priority</span><h3>Hottest opportunities</h3></div><button onClick={() => onNavigate('contacts')}>All contacts ↗</button></div>
          <div className="opportunity-list">
            {hottest.map(lead => (
              <button key={lead.id} onClick={() => onOpenLead(lead)}>
                <div className="avatar">{lead.company.slice(0, 2).toUpperCase()}</div>
                <div><strong>{lead.company}</strong><span>{lead.project}</span></div>
                <ScoreBadge lead={lead}/>
                <b>€{lead.value.toLocaleString()}</b>
              </button>
            ))}
          </div>
        </article>

        <article className="panel activity-panel">
          <div className="panel-head"><div><span className="eyebrow">Timeline</span><h3>Recent activity</h3></div></div>
          <ul className="activity-timeline compact">
            {activities.map(item => <li key={item.time + item.title}><span>{item.time}</span><div><strong>{item.title}</strong><p>{item.detail}</p></div></li>)}
          </ul>
        </article>
      </section>
    </div>
  );
}
