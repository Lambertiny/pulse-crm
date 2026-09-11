import ScoreBadge from './ScoreBadge';

export default function LeadCard({ lead, onOpen, draggable = false, onDragStart }) {
  return (
    <article
      className="lead-card"
      draggable={draggable}
      onDragStart={event => onDragStart?.(event, lead.id)}
      onClick={() => onOpen?.(lead)}
    >
      <div className="lead-card-head">
        <div>
          <small>{lead.company}</small>
          <h3>{lead.project}</h3>
        </div>
        <button aria-label="Lead menu">•••</button>
      </div>
      <div className="lead-value">€{lead.value.toLocaleString()}</div>
      <div className="lead-card-foot">
        <ScoreBadge lead={lead} />
        <span>{lead.lastActivity}</span>
      </div>
    </article>
  );
}
