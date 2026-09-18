export interface UserProfile {
  name: string
  email: string
  avatar: string
  org: string
  cluster: string
}

export interface TelemetryMetric {
  id: string
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  subtitle: string
  iconName: string
}

export interface ProjectItem {
  id: string
  name: string
  title: string
  environment: 'production' | 'staging'
  status: 'healthy' | 'degraded' | 'staging'
  statusLabel: string
  model: string
  promptsCount: number
  canaryInfo: string
  canaryType: 'warning' | 'normal' | 'muted'
  monthlyReqs: string
  p95Latency: string
  latencyStatus?: 'normal' | 'degraded'
  errorRate: string
  lastUpdatedAgo: string
  lastUpdatedBy: string
}

export interface QuickActionItem {
  id: string
  title: string
  subtitle: string
  iconName: string
}

export interface AuditLogItem {
  id: string
  projectId: string
  projectName: string
  action: string
  commitOrTag: string
  target: string
  timeAgo: string
  author: string
  statusColor: string
}

export const MOCK_USER: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex@acme.inc',
  avatar: 'AL',
  org: 'Acme Corp',
  cluster: 'prod-cluster-01',
}

export const MOCK_TELEMETRY: TelemetryMetric[] = [
  {
    id: 'global-invocations',
    label: 'Global Invocations (30d)',
    value: '18.4M',
    change: '+8.2%',
    trend: 'up',
    subtitle: 'vs 17.0M last month',
    iconName: 'Zap',
  },
  {
    id: 'active-canaries',
    label: 'Active Canaries & Tests',
    value: '6 Live Splits',
    subtitle: '2 statistically significant',
    iconName: 'GitFork',
  },
  {
    id: 'avg-latency',
    label: 'Avg Latency (P95)',
    value: '164ms',
    change: '-24ms',
    trend: 'down',
    subtitle: 'steady across 4 regions',
    iconName: 'Gauge',
  },
  {
    id: 'token-spend',
    label: 'Monthly Token Spend',
    value: '$384.20',
    subtitle: '/ $1,000 budget (38.4%)',
    iconName: 'CreditCard',
  },
]

export const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: 'proj_customer_support',
    name: 'proj_customer_support',
    title: 'Customer Support Core',
    environment: 'production',
    status: 'healthy',
    statusLabel: 'Healthy',
    model: 'Claude 3.5 Sonnet',
    promptsCount: 24,
    canaryInfo: '3 Live Canaries',
    canaryType: 'warning',
    monthlyReqs: '8.2M',
    p95Latency: '148ms',
    latencyStatus: 'normal',
    errorRate: '0.02%',
    lastUpdatedAgo: '24m ago',
    lastUpdatedBy: '@sarah',
  },
  {
    id: 'proj_code_review',
    name: 'proj_code_review',
    title: 'Code Review & Security Linter',
    environment: 'production',
    status: 'healthy',
    statusLabel: 'Healthy',
    model: 'GPT-4o',
    promptsCount: 14,
    canaryInfo: '1 Live Canary',
    canaryType: 'warning',
    monthlyReqs: '4.1M',
    p95Latency: '210ms',
    latencyStatus: 'normal',
    errorRate: '0.05%',
    lastUpdatedAgo: '3h ago',
    lastUpdatedBy: '@marcus',
  },
  {
    id: 'proj_data_sql',
    name: 'proj_data_sql',
    title: 'Text-to-SQL Assistant',
    environment: 'production',
    status: 'degraded',
    statusLabel: 'Degraded Latency',
    model: 'DeepSeek-Coder V2',
    promptsCount: 8,
    canaryInfo: '50/50 Split',
    canaryType: 'warning',
    monthlyReqs: '3.9M',
    p95Latency: '114ms',
    latencyStatus: 'degraded',
    errorRate: '0.01%',
    lastUpdatedAgo: '1d ago',
    lastUpdatedBy: '@alex',
  },
  {
    id: 'proj_doc_summarizer',
    name: 'proj_doc_summarizer',
    title: 'Document Summarizer & Reports',
    environment: 'staging',
    status: 'staging',
    statusLabel: 'Staging',
    model: 'Gemini 1.5 Pro',
    promptsCount: 6,
    canaryInfo: '100% Stable',
    canaryType: 'muted',
    monthlyReqs: '2.2M',
    p95Latency: '890ms',
    latencyStatus: 'normal',
    errorRate: '0.00%',
    lastUpdatedAgo: '2d ago',
    lastUpdatedBy: '@karl',
  },
]

export const MOCK_QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: 'gen-key',
    title: 'Generate staging API Key',
    subtitle: 'Generate a scoped token for local CLI',
    iconName: 'Key',
  },
  {
    id: 'clone-prompt',
    title: 'Clone prompt template',
    subtitle: 'Port tested prompts across workspaces',
    iconName: 'Copy',
  },
  {
    id: 'review-canary',
    title: 'Review pending canary rollouts',
    subtitle: '1 pull request waiting for verification',
    iconName: 'CheckSquare',
  },
]

export const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'audit-1',
    projectId: 'proj_customer_support',
    projectName: 'proj_customer_support',
    action: 'rolled out',
    commitOrTag: 'commit c81f9a2',
    target: 'to production',
    timeAgo: '24m ago',
    author: '@sarah',
    statusColor: '#34d399',
  },
  {
    id: 'audit-2',
    projectId: 'proj_code_review',
    projectName: 'proj_code_review',
    action: 'started A/B split',
    commitOrTag: 'v2.1.0-canary',
    target: '',
    timeAgo: '3h ago',
    author: '@marcus',
    statusColor: 'var(--primary-container)',
  },
  {
    id: 'audit-3',
    projectId: 'proj_data_sql',
    projectName: 'proj_data_sql',
    action: 'adjusted fallback model to',
    commitOrTag: 'deepseek-v2',
    target: '',
    timeAgo: '1d ago',
    author: '@alex',
    statusColor: '#fbbf24',
  },
  {
    id: 'audit-4',
    projectId: 'proj_doc_summarizer',
    projectName: 'proj_doc_summarizer',
    action: 'created staging snapshot',
    commitOrTag: 'snap_994d8e',
    target: '',
    timeAgo: '2d ago',
    author: '@karl',
    statusColor: '#988f87',
  },
]
