import LeadCard from './LeadCard';

export default function PipelineColumn({ stage, leads, onDropLead, onOpen, onAddLead }) {
  const total = leads.reduce((sum, lead) => sum + lead.value, 0);
  return (
    <section
      className="pipeline-column"
      onDragOver={event => event.preventDefault()}
      onDrop={event => {
        const id = event.dataTransfer.getData('text/lead-id');
        if (id) onDropLead(id, stage.id);
      }}
    >
      <header>
        <div><span className={`stage-dot ${stage.id}`} /> <strong>{stage.label}</strong><em>{leads.length}</em></div>
        <small>€{total.toLocaleString()}</small>
      </header>
      <div className="pipeline-list">
        {leads.map(lead => (
          <LeadCard
            key={lead.id}
            lead={lead}
            draggable
            onOpen={onOpen}
            onDragStart={(event, id) => event.dataTransfer.setData('text/lead-id', id)}
          />
        ))}
        <button className="add-card" onClick={() => onAddLead(stage.id)}>+ Add lead</button>
      </div>
    </section>
  );
}
