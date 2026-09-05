// Shared type definitions for the homepage components
export interface NavItem {
  label: string
  href: string
  badge?: string
}

export interface StatItem {
  value: string
  label: string
  color?: string
}

export interface FeatureCard {
  icon: string
  title: string
  description: string
}

export interface MetricItem {
  value: string
  label: string
  color?: 'primary' | 'emerald' | 'primary-container' | 'secondary'
}
