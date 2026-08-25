import React, { useState } from 'react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function Schedule({ schedule, subjects }) {
  const todayName = DAYS[new Date().getDay() - 1] || 'Monday'
  const [activeDay, setActiveDay] = useState(todayName)

  const subjectMap = Object.fromEntries(subjects.map(s => [s.id, s]))
  const periods = schedule[activeDay] || []

  return (
    <div className="card">
      <h2 className="section-title">Weekly Schedule</h2>
      <p className="section-desc">Tap a day to see her periods.</p>

      <div className="tag-row">
        {DAYS.map(day => (
          <button
            key={day}
            className={`nav-btn ${day === activeDay ? 'active' : ''}`}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {periods.length === 0 ? (
        <div className="empty-state">No periods logged for {activeDay} yet.</div>
      ) : (
        <div>
          {periods.map(p => {
            const subj = subjectMap[p.subject]
            return (
              <div className="task-item" key={p.period}>
                <span
                  className="pill"
                  style={{ background: (subj?.color || '#ccc') + '22', color: subj?.color || '#666' }}
                >
                  P{p.period}
                </span>
                <span className="task-title">{subj?.name || p.subject}</span>
                <span className="task-meta">{p.time}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
