import React, { useState } from 'react'

const MASTERY_THRESHOLD = 0.85

export default function QuizRunner({ quiz, onComplete, onCancel }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const questions = quiz.questions || []

  function setAnswer(i, value) {
    setAnswers({ ...answers, [i]: value })
  }

  function grade() {
    let correct = 0
    const missed = []
    questions.forEach((q, i) => {
      const given = (answers[i] || '').trim().toLowerCase()
      const expected = (q.answer || '').trim().toLowerCase()
      if (given && given === expected) {
        correct++
      } else {
        missed.push(q.topic || q.question)
      }
    })
    return { score: questions.length ? correct / questions.length : 0, missedTopics: missed }
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    const result = grade()
    const pct = Math.round(result.score * 100)
    const passed = result.score >= MASTERY_THRESHOLD

    return (
      <div>
        <h2 className="section-title">Quiz Results</h2>
        <div className="row" style={{ marginBottom: 16 }}>
          <span className={`pill ${passed ? 'pill-good' : 'pill-behind'}`} style={{ fontSize: 15, padding: '6px 14px' }}>
            {pct}% {passed ? '— understood' : '— needs review'}
          </span>
        </div>

        {!passed && result.missedTopics.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div className="section-desc" style={{ marginBottom: 8 }}>Review these before moving on:</div>
            {result.missedTopics.map((t, i) => (
              <div className="task-item" key={i}>
                <span className="task-title">{t}</span>
              </div>
            ))}
          </div>
        )}

        <button className="btn btn-primary" onClick={() => onComplete(result)}>Save and continue</button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="section-title">Quiz</h2>
      <p className="section-desc">Answer each question, then submit. 85% or higher counts as understood.</p>

      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 8 }}>{i + 1}. {q.question}</div>
          {q.type === 'multiple_choice' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(q.options || []).map(opt => (
                <label key={opt} className="row" style={{ fontSize: 13.5, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name={`q${i}`}
                    checked={answers[i] === opt}
                    onChange={() => setAnswer(i, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <input type="text" placeholder="Your answer" value={answers[i] || ''} onChange={e => setAnswer(i, e.target.value)} />
          )}
        </div>
      ))}

      <div className="row">
        <button className="btn btn-primary" onClick={handleSubmit}>Submit quiz</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}
