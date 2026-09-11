export default function MiniChart({ values, labels }) {
  const max = Math.max(...values);
  return (
    <div className="mini-chart" aria-label="Pipeline chart">
      {values.map((value, index) => (
        <div className="mini-bar-wrap" key={labels[index]}>
          <div className="mini-bar-track"><div className="mini-bar" style={{ height: `${Math.max(12, (value / max) * 100)}%` }} /></div>
          <span>{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}
