import React from 'react'

function GrowthArc({ percent, color }) {
  const r = 26
  const c = 2 * Math.PI * r
  const offset = c - (percent / 100) * c
  return (
    <div className="arc-wrap">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
        <circle
          cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 32 32)"
        />
      </svg>
      <div className="arc-label">{Math.round(percent)}%</div>
    </div>
  )
}

export default function SubjectTracker({ quizzes, subjects }) {
  const priority = subjects.filter(s => s.priority)
  const rest = subjects.filter(s => !s.priority)
  const ordered = [...priority, ...rest]

  function statsFor(subjectId) {
    const subjQuizzes = quizzes.filter(q => q.subject === subjectId).sort((a, b) => a.date.localeCompare(b.date))
    if (subjQuizzes.length === 0) return null
    const avg = subjQuizzes.reduce((sum, q) => sum + q.score, 0) / subjQuizzes.length * 100
    const recent = subjQuizzes.slice(-3)
    const older = subjQuizzes.slice(0, -3)
    let trend = 'steady'
    if (older.length > 0) {
      const recentAvg = recent.reduce((s, q) => s + q.score, 0) / recent.length
      const olderAvg = older.reduce((s, q) => s + q.score, 0) / older.length
      if (recentAvg - olderAvg > 0.05) trend = 'up'
      else if (olderAvg - recentAvg > 0.05) trend = 'down'
    }
    return { avg, trend, count: subjQuizzes.length }
  }

  return (
    <div className="card">
      <h2 className="section-title">Subject Performance</h2>
      <p className="section-desc">English and Computer Science are flagged as priority focus.</p>

      <div className="grid grid-3">
        {ordered.map(s => {
          const stats = statsFor(s.id)
          return (
            <div className="card" key={s.id} style={{ boxShadow: 'none', border: '1px solid var(--border)' }}>
              <div className="row-between" style={{ marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15 }}>{s.name}</span>
                {s.priority && <span className="pill pill-priority">Focus</span>}
              </div>

              {stats ? (
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <GrowthArc percent={stats.avg} color={s.color} />
                  <div style={{ textAlign: 'right' }}>
                    <div className="task-meta">{stats.count} quiz{stats.count === 1 ? '' : 'zes'}</div>
                    <span className={`pill ${stats.trend === 'up' ? 'pill-good' : stats.trend === 'down' ? 'pill-behind' : ''}`}>
                      {stats.trend === 'up' ? '↑ improving' : stats.trend === 'down' ? '↓ slipping' : '– steady'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="empty-state" style={{ padding: '16px 0' }}>No quizzes yet</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
