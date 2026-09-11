export function getScore(lead) {
  return Math.round((lead.budget * .35) + (lead.urgency * .25) + (lead.engagement * .40));
}

export function getTier(score) {
  if (score >= 80) return 'HOT';
  if (score >= 60) return 'WARM';
  return 'COLD';
}

export default function ScoreBadge({ lead }) {
  const score = getScore(lead);
  const tier = getTier(score);
  return <span className={`score-badge ${tier.toLowerCase()}`}>{tier} · {score}</span>;
}
