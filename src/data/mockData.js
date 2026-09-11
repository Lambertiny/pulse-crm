export const initialLeads = [
  {
    id: 'lead-001',
    name: 'Maya Costa',
    company: 'North Studio',
    project: 'Website Redesign',
    value: 4800,
    stage: 'proposal',
    budget: 90,
    urgency: 82,
    engagement: 88,
    lastActivity: '2h',
    email: 'maya@northstudio.com',
    source: 'Referral'
  },
  {
    id: 'lead-002',
    name: 'Daniel Silva',
    company: 'Verde Café',
    project: 'Brand Identity',
    value: 2300,
    stage: 'qualified',
    budget: 68,
    urgency: 64,
    engagement: 74,
    lastActivity: '1d',
    email: 'daniel@verdecafe.co',
    source: 'Instagram'
  },
  {
    id: 'lead-003',
    name: 'Amelia Ford',
    company: 'Aura Labs',
    project: 'Product UI System',
    value: 6200,
    stage: 'negotiation',
    budget: 95,
    urgency: 78,
    engagement: 92,
    lastActivity: '4h',
    email: 'amelia@auralabs.io',
    source: 'Website'
  },
  {
    id: 'lead-004',
    name: 'Jonas Berg',
    company: 'Nord & Form',
    project: 'Landing Page',
    value: 1800,
    stage: 'new',
    budget: 62,
    urgency: 72,
    engagement: 48,
    lastActivity: '6h',
    email: 'jonas@nordform.se',
    source: 'LinkedIn'
  },
  {
    id: 'lead-005',
    name: 'Sofia Mendes',
    company: 'Casa Clara',
    project: 'E-commerce UX',
    value: 5400,
    stage: 'won',
    budget: 88,
    urgency: 80,
    engagement: 96,
    lastActivity: '1d',
    email: 'sofia@casaclara.pt',
    source: 'Referral'
  },
  {
    id: 'lead-006',
    name: 'Oliver Chen',
    company: 'Field Office',
    project: 'Studio Portfolio',
    value: 3600,
    stage: 'proposal',
    budget: 76,
    urgency: 55,
    engagement: 68,
    lastActivity: '3d',
    email: 'oliver@fieldoffice.design',
    source: 'Website'
  },
  {
    id: 'lead-007',
    name: 'Lina Rossi',
    company: 'Marea',
    project: 'Campaign Microsite',
    value: 2900,
    stage: 'new',
    budget: 58,
    urgency: 60,
    engagement: 52,
    lastActivity: '2d',
    email: 'lina@marea.studio',
    source: 'Instagram'
  }
];

export const initialTasks = [
  { id: 'task-01', title: 'Follow up — North Studio', due: 'Today', completed: false, priority: 'high' },
  { id: 'task-02', title: 'Prepare proposal — Verde Café', due: 'Today', completed: false, priority: 'medium' },
  { id: 'task-03', title: 'Discovery call — Aura Labs', due: 'Today', completed: true, priority: 'high' },
  { id: 'task-04', title: 'Review scope — Field Office', due: 'Tomorrow', completed: false, priority: 'medium' },
  { id: 'task-05', title: 'Send onboarding pack — Casa Clara', due: 'Sep 13', completed: false, priority: 'low' }
];

export const stageMeta = [
  { id: 'new', label: 'New' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'negotiation', label: 'Negotiation' },
  { id: 'won', label: 'Won' }
];

export const activities = [
  { time: '09:42', title: 'Proposal viewed', detail: 'North Studio opened proposal #P-019.' },
  { time: '08:15', title: 'Lead qualified', detail: 'Verde Café moved to Qualified.' },
  { time: 'Yesterday', title: 'Discovery call completed', detail: 'Aura Labs call notes were added.' },
  { time: 'Sep 09', title: 'Deal won', detail: 'Casa Clara accepted the project scope.' }
];

export const automations = [
  {
    id: 'auto-1',
    name: 'New Lead Follow-up',
    status: 'Active',
    steps: ['New lead', 'Wait 24h', 'Send follow-up', 'Update CRM']
  },
  {
    id: 'auto-2',
    name: 'Proposal Reminder',
    status: 'Active',
    steps: ['Proposal sent', 'Wait 3 days', 'No reply?', 'Create task']
  },
  {
    id: 'auto-3',
    name: 'Client Onboarding',
    status: 'Draft',
    steps: ['Deal won', 'Send welcome', 'Create workspace', 'Schedule kickoff']
  }
];
