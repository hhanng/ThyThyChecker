import React, { useState } from 'react'
import { uid, todayStr } from '../utils/storage'
import { generateQuiz } from '../utils/aiClient'
import QuizRunner from './QuizRunner'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function DailyUpload({ uploads, setUploads, quizzes, setQuizzes, subjects, schedule, apiKey }) {
  const [subject, setSubject] = useState(subjects[0]?.id || '')
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('')
  const [status, setStatus] = useState('')
  const [activeQuiz, setActiveQuiz] = useState(null)

  const today = todayStr()
  const todayDayName = DAYS[new Date().getDay()]
  const todaysClasses = schedule[todayDayName] || []
  const todaysUploads = uploads.filter(u => u.date === today)
  const uploadedSubjectIds = new Set(todaysUploads.map(u => u.subject))
  const missingSubjects = todaysClasses
    .map(p => p.subject)
    .filter((id, i, arr) => arr.indexOf(id) === i)
    .filter(id => !uploadedSubjectIds.has(id))

  const subjectMap = Object.fromEntries(subjects.map(s => [s.id, s]))

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    const isPlainText = /\.(txt|md)$/i.test(file.name)
    if (isPlainText) {
      const reader = new FileReader()
      reader.onload = ev => setText(ev.target.result)
      reader.readAsText(file)
    } else {
      setText('')
      setStatus(
        `"${file.name}" is stored, but automatic text extraction from PDF/PPTX/photos isn't wired up yet — paste the key notes text below so a quiz can be generated from it.`
      )
    }
  }

  async function handleGenerate() {
    if (!apiKey) {
      setStatus('Add a Gemini API key in Settings first — quiz generation needs it.')
      return
    }
    if (!text.trim()) {
      setStatus('Paste or upload some note content first.')
      return
    }
    setStatus('Generating quiz...')
    try {
      const subjName = subjectMap[subject]?.name || subject
      const quiz = await generateQuiz(apiKey, text, subjName)
      setUploads([...uploads, { id: uid(), subject, date: today, filename: fileName || 'pasted notes' }])
      setActiveQuiz({ subject, questions: quiz.questions })
      setStatus('')
    } catch (err) {
      setStatus('Could not generate quiz: ' + err.message)
    }
  }

  function handleQuizComplete(result) {
    setQuizzes([
      ...quizzes,
      {
        id: uid(),
        subject: activeQuiz.subject,
        date: today,
        score: result.score,
        missedTopics: result.missedTopics,
      },
    ])
    setActiveQuiz(null)
    setText('')
    setFileName('')
  }

  if (activeQuiz) {
    return (
      <div className="card">
        <QuizRunner quiz={activeQuiz} onComplete={handleQuizComplete} onCancel={() => setActiveQuiz(null)} />
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="section-title">Daily Upload</h2>
      <p className="section-desc">Upload today's notes to generate a quiz from them.</p>

      {todaysClasses.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {missingSubjects.length === 0 ? (
            <span className="pill pill-good">All of today's classes have notes uploaded</span>
          ) : (
            <span className="pill pill-behind">
              Missing uploads: {missingSubjects.map(id => subjectMap[id]?.name || id).join(', ')}
            </span>
          )}
        </div>
      )}

      <div className="row" style={{ marginBottom: 12, flexWrap: 'wrap' }}>
        <select value={subject} onChange={e => setSubject(e.target.value)} style={{ flex: 1, minWidth: 140 }}>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input type="file" onChange={handleFile} style={{ flex: 2, minWidth: 180 }} />
      </div>

      <textarea
        rows={6}
        placeholder="Paste note/PowerPoint text here (or it'll auto-fill for .txt/.md uploads)..."
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      {status && <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginBottom: 12 }}>{status}</p>}

      <button className="btn btn-primary" onClick={handleGenerate}>Generate quiz from this</button>

      {todaysUploads.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div className="section-desc" style={{ marginBottom: 8 }}>Today's uploads</div>
          {todaysUploads.map(u => (
            <div className="task-item" key={u.id}>
              <span className="pill" style={{ background: 'var(--berry-soft)', color: 'var(--berry)' }}>
                {subjectMap[u.subject]?.name || u.subject}
              </span>
              <span className="task-title">{u.filename}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
