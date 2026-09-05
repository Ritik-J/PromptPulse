const METRICS = [
  { value: '99.99%', label: 'Gateway Uptime SLA',      color: 'var(--primary-color)' },
  { value: '-38ms',  label: 'Avg P95 Latency Reduction', color: '#34d399' },
  { value: '22.5%',  label: 'Token Spend Saved',        color: 'var(--primary-container)' },
  { value: '100+',   label: 'SDK & LangChain Integrations', color: 'var(--secondary-color)' },
]

export default function MetricsBanner() {
  return (
    <section className="w-full border-y py-14"
      style={{
        background: 'var(--surface-lowest)',
        borderColor: 'rgba(76,70,63,0.3)',
      }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {METRICS.map(({ value, label, color }) => (
          <div key={label}>
            <div className="font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                color,
              }}>
              {value}
            </div>
            <div className="mt-1 text-xs" style={{ color: 'var(--outline)' }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
