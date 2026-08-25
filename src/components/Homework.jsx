import React, { useState } from 'react'
import { uid, todayStr } from '../utils/storage'

export default function Homework({ homework, setHomework, subjects }) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState(subjects[0]?.id || '')
  const [dueDate, setDueDate] = useState(todayStr())

  const subjectMap = Object.fromEntries(subjects.map(s => [s.id, s]))

  function addHomework(e) {
    e.preventDefault()
    if (!title.trim()) return
    setHomework([
      ...homework,
      { id: uid(), subject, title: title.trim(), dueDate, done: false },
    ])
    setTitle('')
  }

  function toggle(id) {
    setHomework(homework.map(h => h.id === id ? { ...h, done: !h.done } : h))
  }

  function remove(id) {
    setHomework(homework.filter(h => h.id !== id))
  }

  const sorted = [...homework].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1
    return a.dueDate.localeCompare(b.dueDate)
  })

  return (
    <div className="card">
      <h2 className="section-title">Homework Tracker</h2>
      <p className="section-desc">Add assignments, check them off as she finishes.</p>

      <form onSubmit={addHomework} className="row" style={{ marginBottom: 18, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Assignment title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ flex: 2, minWidth: 160 }}
        />
        <select value={subject} onChange={e => setSubject(e.target.value)} style={{ flex: 1, minWidth: 130 }}>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          style={{ flex: 1, minWidth: 130 }}
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      {sorted.length === 0 ? (
        <div className="empty-state">No homework yet — add her first assignment above.</div>
      ) : (
        sorted.map(h => {
          const subj = subjectMap[h.subject]
          return (
            <div className={`task-item ${h.done ? 'done' : ''}`} key={h.id}>
              <button
                className={`checkbox ${h.done ? 'checked' : ''}`}
                onClick={() => toggle(h.id)}
                aria-label={h.done ? 'Mark not done' : 'Mark done'}
              >
                {h.done ? '✓' : ''}
              </button>
              <span
                className="pill"
                style={{ background: (subj?.color || '#ccc') + '22', color: subj?.color || '#666' }}
              >
                {subj?.name || h.subject}
              </span>
              <span className="task-title">{h.title}</span>
              <span className="task-meta">{h.dueDate}</span>
              <button className="btn btn-ghost" onClick={() => remove(h.id)}>Remove</button>
            </div>
          )
        })
      )}
    </div>
  )
}
