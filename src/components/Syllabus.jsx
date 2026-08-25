import React, { useState } from 'react'

export default function Syllabus({ notes, setNotes, subjects }) {
  const [activeSubject, setActiveSubject] = useState(subjects[0]?.id || '')
  const draft = notes[activeSubject] || ''

  function updateNote(value) {
    setNotes({ ...notes, [activeSubject]: value })
  }

  return (
    <div className="card">
      <h2 className="section-title">Syllabus &amp; Notes</h2>
      <p className="section-desc">Grading policy, teacher contact, recurring reminders — one space per class.</p>

      <div className="tag-row">
        {subjects.map(s => (
          <button
            key={s.id}
            className={`nav-btn ${s.id === activeSubject ? 'active' : ''}`}
            onClick={() => setActiveSubject(s.id)}
          >
            {s.name}
          </button>
        ))}
      </div>

      <textarea
        rows={10}
        placeholder={`Notes for ${subjects.find(s => s.id === activeSubject)?.name || 'this class'}...`}
        value={draft}
        onChange={e => updateNote(e.target.value)}
      />
    </div>
  )
}
