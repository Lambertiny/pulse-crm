export default function StatCard({ label, value, delta, accent }) {
  return (
    <article className={`stat-card ${accent ? 'accent' : ''}`}>
      <div className="stat-meta"><span>{label}</span><i>↗</i></div>
      <strong>{value}</strong>
      <small>{delta}</small>
    </article>
  );
}
