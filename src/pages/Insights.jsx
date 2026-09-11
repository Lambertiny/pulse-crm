import MiniChart from '../components/MiniChart';

export default function Insights({ leads }) {
  const months = ['Apr','May','Jun','Jul','Aug','Sep'];
  const revenue = [6200, 8400, 7100, 9800, 12500, 14800];
  const sources = ['Referral','Website','Instagram','LinkedIn'];
  const sourceCounts = sources.map(source => leads.filter(l => l.source === source).length);
  return (
    <div className="page-stack">
      <section className="section-intro compact-intro"><div><span className="eyebrow">Performance</span><h2>Insights</h2><p>Understand what is converting, where revenue is coming from and what deserves attention next.</p></div></section>
      <section className="insights-grid">
        <article className="panel insight-large"><div className="panel-head"><div><span className="eyebrow">Revenue trend</span><h3>Pipeline momentum</h3></div><strong>€14.8k</strong></div><MiniChart values={revenue} labels={months}/></article>
        <article className="panel source-panel"><div className="panel-head"><div><span className="eyebrow">Acquisition</span><h3>Lead sources</h3></div></div>{sources.map((source,i)=><div className="source-row" key={source}><div><span>{source}</span><strong>{sourceCounts[i]}</strong></div><div className="source-track"><i style={{width:`${Math.max(12,sourceCounts[i]/Math.max(...sourceCounts)*100)}%`}}/></div></div>)}</article>
      </section>
      <section className="stats-grid insight-stats"><Stat label="Average deal" value="€3,860" note="+8.1% this quarter"/><Stat label="Sales cycle" value="16 days" note="2.4 days faster"/><Stat label="Reply rate" value="74%" note="+6.2% this month"/><Stat label="Won revenue" value="€5,400" note="1 closed project"/></section>
    </div>
  );
}

function Stat({label,value,note}){return <article className="stat-card"><div className="stat-meta"><span>{label}</span><i>↗</i></div><strong>{value}</strong><small>{note}</small></article>}
