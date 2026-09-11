import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import LeadDrawer from './components/LeadDrawer';
import WorkflowDrawer from './components/WorkflowDrawer';
import CreateModal from './components/CreateModal';
import SettingsModal from './components/SettingsModal';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import Pipeline from './pages/Pipeline';
import Contacts from './pages/Contacts';
import Tasks from './pages/Tasks';
import Automations from './pages/Automations';
import Insights from './pages/Insights';
import { initialLeads, initialTasks, automations as initialAutomations } from './data/mockData';

const pageTitles = {
  overview: 'Overview',
  pipeline: 'Pipeline',
  contacts: 'Contacts',
  tasks: 'Tasks',
  automations: 'Automations',
  insights: 'Insights'
};

function readLocal(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [page, setPage] = useState('overview');
  const [leads, setLeads] = useState(() => readLocal('pulse-leads', initialLeads));
  const [tasks, setTasks] = useState(() => readLocal('pulse-tasks', initialTasks));
  const [automations, setAutomations] = useState(() => readLocal('pulse-automations', initialAutomations));
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedAutomation, setSelectedAutomation] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => localStorage.setItem('pulse-leads', JSON.stringify(leads)), [leads]);
  useEffect(() => localStorage.setItem('pulse-tasks', JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem('pulse-automations', JSON.stringify(automations)), [automations]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const moveLead = (id, stage) => {
    setLeads(current => current.map(lead => lead.id === id ? { ...lead, stage, lastActivity: 'now' } : lead));
    setSelectedLead(current => current?.id === id ? { ...current, stage, lastActivity: 'now' } : current);
  };

  const toggleTask = id => {
    setTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const createLead = data => {
    const lead = {
      id: `lead-${Date.now()}`,
      ...data,
      budget: 72,
      urgency: 70,
      engagement: 68,
      lastActivity: 'now'
    };
    setLeads(current => [lead, ...current]);
    setModal(null);
    setSelectedLead(lead);
    setNotice('Lead created and added to the pipeline.');
  };

  const createTask = data => {
    setTasks(current => [{ id: `task-${Date.now()}`, completed: false, ...data }, ...current]);
    setModal(null);
    setNotice('Task created successfully.');
  };

  const createAutomation = data => {
    const automation = { id: `auto-${Date.now()}`, lastRun: 'Never', ...data };
    setAutomations(current => [automation, ...current]);
    setModal(null);
    setNotice('Automation created and saved locally.');
  };

  const openLeadModal = stage => setModal({ type: 'lead', stage: typeof stage === 'string' ? stage : 'new' });

  const openGlobalSearch = () => {
    setPage('contacts');
    setMenuOpen(false);
    window.setTimeout(() => document.querySelector('[data-global-search]')?.focus(), 60);
  };

  const resetDemoData = () => {
    setLeads(initialLeads);
    setTasks(initialTasks);
    setAutomations(initialAutomations);
    setSelectedLead(null);
    setSelectedAutomation(null);
    setNotice('Demo data restored.');
  };

  const pages = {
    overview: <Dashboard leads={leads} tasks={tasks} onOpenLead={setSelectedLead} onNavigate={setPage} />,
    pipeline: <Pipeline leads={leads} onMoveLead={moveLead} onOpenLead={setSelectedLead} onNewLead={openLeadModal} />,
    contacts: <Contacts leads={leads} onOpenLead={setSelectedLead} />,
    tasks: <Tasks tasks={tasks} onToggleTask={toggleTask} onNewTask={() => setModal({ type: 'task' })} />,
    automations: <Automations automations={automations} onNewAutomation={() => setModal({ type: 'automation' })} onOpenAutomation={setSelectedAutomation} />,
    insights: <Insights leads={leads} />
  };

  return (
    <div className="app-shell">
      <Sidebar
        activePage={page}
        onNavigate={setPage}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSettings={() => { setSettingsOpen(true); setMenuOpen(false); }}
      />
      {menuOpen && <button className="mobile-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}

      <main className="main-shell">
        <TopBar
          pageTitle={pageTitles[page]}
          onMenu={() => setMenuOpen(value => !value)}
          onNewLead={() => openLeadModal('new')}
          onSearch={openGlobalSearch}
          onNotifications={() => setNotice("You're all caught up — no new notifications.")}
        />
        <div className="content-wrap">{pages[page]}</div>
      </main>

      <LeadDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
      <WorkflowDrawer automation={selectedAutomation} onClose={() => setSelectedAutomation(null)} />
      <CreateModal
        modal={modal}
        onClose={() => setModal(null)}
        onCreateLead={createLead}
        onCreateTask={createTask}
        onCreateAutomation={createAutomation}
      />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} onReset={resetDemoData} />
      <Toast message={notice} />
    </div>
  );
}
