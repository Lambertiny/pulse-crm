import { useMemo, useState } from 'react';
import PipelineColumn from '../components/PipelineColumn';
import { stageMeta } from '../data/mockData';

export default function Pipeline({ leads, onMoveLead, onOpenLead, onNewLead }) {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => leads.filter(lead => {
    if (filter === 'high') return lead.value >= 4000;
    if (filter === 'week') return !['3d','6d','7d'].includes(lead.lastActivity);
    return true;
  }), [leads, filter]);

  return (
    <div className="page-stack">
      <section className="section-intro compact-intro">
        <div><span className="eyebrow">Deal flow</span><h2>Move every opportunity forward.</h2><p>Drag cards between stages. Changes persist locally in your browser.</p></div>
        <div className="filter-row"><button onClick={()=>setFilter('all')} className={`filter ${filter==='all'?'active':''}`}>All deals</button><button onClick={()=>setFilter('high')} className={`filter ${filter==='high'?'active':''}`}>High value</button><button onClick={()=>setFilter('week')} className={`filter ${filter==='week'?'active':''}`}>This week</button></div>
      </section>
      <section className="pipeline-board">
        {stageMeta.map(stage => (
          <PipelineColumn
            key={stage.id}
            stage={stage}
            leads={filtered.filter(lead => lead.stage === stage.id)}
            onDropLead={onMoveLead}
            onOpen={onOpenLead}
            onAddLead={onNewLead}
          />
        ))}
      </section>
    </div>
  );
}
