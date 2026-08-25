import React, { useState } from 'react'
import { uid, todayStr, daysUntil } from '../utils/storage'

export default function Exams({ exams, setExams, subjects }) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState(subjects[0]?.id || '')
  const [date, setDate] = useState(todayStr())

  const subjectMap = Object.fromEntries(subjects.map(s => [s.id, s]))

  function addExam(e) {
    e.preventDefault()
    if (!title.trim()) return
    setExams([...exams, { id: uid(), subject, title: title.trim(), date }])
    setTitle('')
  }

  function remove(id) {
    setExams(exams.filter(x => x.id !== id))
  }

  const sorted = [...exams].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="card">
      <h2 className="section-title">Exam Tracker</h2>
      <p className="section-desc">Countdown to every upcoming test.</p>

      <form onSubmit={addExam} className="row" style={{ marginBottom: 18, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Exam name"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ flex: 2, minWidth: 160 }}
        />
        <select value={subject} onChange={e => setSubject(e.target.value)} style={{ flex: 1, minWidth: 130 }}>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ flex: 1, minWidth: 130 }} />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      {sorted.length === 0 ? (
        <div className="empty-state">No exams logged yet.</div>
      ) : (
        <div className="grid grid-3">
          {sorted.map(ex => {
            const subj = subjectMap[ex.subject]
            const d = daysUntil(ex.date)
            const label = d < 0 ? 'Past' : d === 0 ? 'Today' : `${d} day${d === 1 ? '' : 's'}`
            return (
              <div className="card" key={ex.id} style={{ boxShadow: 'none', border: '1px solid var(--border)' }}>
                <span
                  className="pill"
                  style={{ background: (subj?.color || '#ccc') + '22', color: subj?.color || '#666' }}
                >
                  {subj?.name || ex.subject}
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, margin: '8px 0 2px' }}>
                  {ex.title}
                </div>
                <div className="task-meta" style={{ marginBottom: 10 }}>{ex.date}</div>
                <div className="row-between">
                  <span
                    className="pill"
                    style={{
                      background: d <= 2 ? 'var(--amber-soft)' : 'var(--sage-soft)',
                      color: d <= 2 ? 'var(--amber)' : 'var(--sage)',
                    }}
                  >
                    {label}
                  </span>
                  <button className="btn btn-ghost" onClick={() => remove(ex.id)}>Remove</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
