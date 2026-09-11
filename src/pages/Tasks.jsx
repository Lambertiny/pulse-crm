import { useState } from 'react';

export default function Tasks({ tasks, onToggleTask, onNewTask }) {
  const [filter, setFilter] = useState('all');
  const visible = tasks.filter(task => filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed);
  return (
    <div className="page-stack">
      <section className="section-intro compact-intro"><div><span className="eyebrow">Focus queue</span><h2>Tasks</h2><p>Keep follow-ups, proposals and client commitments moving.</p></div><button className="primary-button" onClick={onNewTask}>+ New task</button></section>
      <section className="panel tasks-panel">
        <div className="filter-row"><button onClick={()=>setFilter('all')} className={`filter ${filter==='all'?'active':''}`}>All</button><button onClick={()=>setFilter('open')} className={`filter ${filter==='open'?'active':''}`}>Open</button><button onClick={()=>setFilter('completed')} className={`filter ${filter==='completed'?'active':''}`}>Completed</button></div>
        <div className="task-list">
          {visible.map(task => <label className={`task-row ${task.completed?'done':''}`} key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={()=>onToggleTask(task.id)} />
            <span className={`priority-dot ${task.priority}`} />
            <div><strong>{task.title}</strong><small>{task.due}</small></div>
            <span>↗</span>
          </label>)}
        </div>
      </section>
    </div>
  );
}
