import { useEffect, useMemo, useState } from 'react';

const emptyLead = {
  name: '', company: '', project: '', value: '', stage: 'new', email: '', source: 'Website'
};
const emptyTask = { title: '', due: 'Today', priority: 'medium' };
const emptyAutomation = { name: '', status: 'Draft', steps: 'Trigger\nWait 24h\nCreate task' };

export default function CreateModal({ modal, onClose, onCreateLead, onCreateTask, onCreateAutomation }) {
  const type = modal?.type;
  const [lead, setLead] = useState(emptyLead);
  const [task, setTask] = useState(emptyTask);
  const [automation, setAutomation] = useState(emptyAutomation);

  useEffect(() => {
    if (!modal) return;
    setLead({ ...emptyLead, stage: modal.stage || 'new' });
    setTask(emptyTask);
    setAutomation(emptyAutomation);
  }, [modal]);

  useEffect(() => {
    if (!modal) return;
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal, onClose]);

  const title = useMemo(() => ({ lead:'New lead', task:'New task', automation:'New automation' }[type]), [type]);
  if (!modal) return null;

  const submitLead = e => {
    e.preventDefault();
    if (!lead.name.trim() || !lead.company.trim() || !lead.project.trim()) return;
    onCreateLead({ ...lead, value: Number(lead.value) || 0 });
  };

  const submitTask = e => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onCreateTask(task);
  };

  const submitAutomation = e => {
    e.preventDefault();
    if (!automation.name.trim()) return;
    onCreateAutomation({
      ...automation,
      steps: automation.steps.split(/\n|,/).map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section className="create-modal" role="dialog" aria-modal="true" aria-labelledby="create-title">
        <div className="modal-head">
          <div><span className="eyebrow">Quick create</span><h2 id="create-title">{title}</h2></div>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {type === 'lead' && <form onSubmit={submitLead} className="modal-form">
          <div className="form-grid two-col">
            <label><span>Client name</span><input autoFocus value={lead.name} onChange={e=>setLead({...lead,name:e.target.value})} placeholder="Maya Costa" /></label>
            <label><span>Company</span><input value={lead.company} onChange={e=>setLead({...lead,company:e.target.value})} placeholder="North Studio" /></label>
          </div>
          <label><span>Project</span><input value={lead.project} onChange={e=>setLead({...lead,project:e.target.value})} placeholder="Website redesign" /></label>
          <div className="form-grid two-col">
            <label><span>Value (€)</span><input type="number" min="0" value={lead.value} onChange={e=>setLead({...lead,value:e.target.value})} placeholder="4800" /></label>
            <label><span>Stage</span><select value={lead.stage} onChange={e=>setLead({...lead,stage:e.target.value})}><option value="new">New</option><option value="qualified">Qualified</option><option value="proposal">Proposal</option><option value="negotiation">Negotiation</option><option value="won">Won</option></select></label>
          </div>
          <div className="form-grid two-col">
            <label><span>Email</span><input type="email" value={lead.email} onChange={e=>setLead({...lead,email:e.target.value})} placeholder="client@company.com" /></label>
            <label><span>Source</span><select value={lead.source} onChange={e=>setLead({...lead,source:e.target.value})}><option>Website</option><option>Referral</option><option>Instagram</option><option>LinkedIn</option><option>Other</option></select></label>
          </div>
          <div className="modal-actions"><button type="button" className="ghost-button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Create lead</button></div>
        </form>}

        {type === 'task' && <form onSubmit={submitTask} className="modal-form">
          <label><span>Task</span><input autoFocus value={task.title} onChange={e=>setTask({...task,title:e.target.value})} placeholder="Follow up — North Studio" /></label>
          <div className="form-grid two-col">
            <label><span>Due</span><input value={task.due} onChange={e=>setTask({...task,due:e.target.value})} placeholder="Today" /></label>
            <label><span>Priority</span><select value={task.priority} onChange={e=>setTask({...task,priority:e.target.value})}><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></label>
          </div>
          <div className="modal-actions"><button type="button" className="ghost-button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Create task</button></div>
        </form>}

        {type === 'automation' && <form onSubmit={submitAutomation} className="modal-form">
          <label><span>Automation name</span><input autoFocus value={automation.name} onChange={e=>setAutomation({...automation,name:e.target.value})} placeholder="Proposal follow-up" /></label>
          <label><span>Status</span><select value={automation.status} onChange={e=>setAutomation({...automation,status:e.target.value})}><option>Draft</option><option>Active</option></select></label>
          <label><span>Workflow steps</span><textarea rows="5" value={automation.steps} onChange={e=>setAutomation({...automation,steps:e.target.value})} /><small>One step per line.</small></label>
          <div className="modal-actions"><button type="button" className="ghost-button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Create automation</button></div>
        </form>}
      </section>
    </div>
  );
}
