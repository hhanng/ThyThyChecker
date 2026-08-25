import React, { useState } from 'react'
import { uid } from '../utils/storage'
import { generateFlashcards } from '../utils/aiClient'

export default function Practice({ flashcards, setFlashcards, subjects, apiKey }) {
  const [subject, setSubject] = useState(subjects[0]?.id || '')
  const [mode, setMode] = useState('study') // study | add | generate
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [sourceText, setSourceText] = useState('')
  const [status, setStatus] = useState('')

  const deck = flashcards.filter(c => c.subject === subject)
  const current = deck[index % Math.max(deck.length, 1)]

  function addCard(e) {
    e.preventDefault()
    if (!front.trim() || !back.trim()) return
    setFlashcards([...flashcards, { id: uid(), subject, front: front.trim(), back: back.trim() }])
    setFront('')
    setBack('')
  }

  async function handleGenerate() {
    if (!apiKey) { setStatus('Add a Gemini API key in Settings first.'); return }
    if (!sourceText.trim()) { setStatus('Paste some notes to generate cards from.'); return }
    setStatus('Generating flashcards...')
    try {
      const subjName = subjects.find(s => s.id === subject)?.name || subject
      const result = await generateFlashcards(apiKey, sourceText, subjName)
      const newCards = (result.cards || []).map(c => ({ id: uid(), subject, front: c.front, back: c.back }))
      setFlashcards([...flashcards, ...newCards])
      setStatus(`Added ${newCards.length} cards.`)
      setSourceText('')
    } catch (err) {
      setStatus('Could not generate cards: ' + err.message)
    }
  }

  function next() {
    setFlipped(false)
    setIndex(i => (i + 1) % Math.max(deck.length, 1))
  }

  return (
    <div className="card">
      <h2 className="section-title">Practice Mode</h2>
      <p className="section-desc">Flashcards and problems, by subject.</p>

      <div className="tag-row">
        {subjects.map(s => (
          <button
            key={s.id}
            className={`nav-btn ${s.id === subject ? 'active' : ''}`}
            onClick={() => { setSubject(s.id); setIndex(0); setFlipped(false) }}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="row" style={{ marginBottom: 16 }}>
        <button className={`btn ${mode === 'study' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setMode('study')}>Study</button>
        <button className={`btn ${mode === 'add' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setMode('add')}>Add card</button>
        <button className={`btn ${mode === 'generate' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setMode('generate')}>Generate from notes</button>
      </div>

      {mode === 'study' && (
        deck.length === 0 ? (
          <div className="empty-state">No flashcards for this subject yet — add some or generate from notes.</div>
        ) : (
          <div>
            <div
              onClick={() => setFlipped(f => !f)}
              style={{
                background: 'var(--berry-soft)',
                borderRadius: 14,
                padding: '40px 24px',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 500,
                cursor: 'pointer',
                minHeight: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14,
              }}
            >
              {flipped ? current?.back : current?.front}
            </div>
            <div className="row-between">
              <span className="task-meta">{index + 1} / {deck.length} · tap card to flip</span>
              <button className="btn btn-primary" onClick={next}>Next card</button>
            </div>
          </div>
        )
      )}

      {mode === 'add' && (
        <form onSubmit={addCard}>
          <input type="text" placeholder="Front (term/question)" value={front} onChange={e => setFront(e.target.value)} style={{ marginBottom: 10 }} />
          <input type="text" placeholder="Back (answer)" value={back} onChange={e => setBack(e.target.value)} style={{ marginBottom: 10 }} />
          <button type="submit" className="btn btn-primary">Add card</button>
        </form>
      )}

      {mode === 'generate' && (
        <div>
          <textarea rows={6} placeholder="Paste notes to turn into flashcards..." value={sourceText} onChange={e => setSourceText(e.target.value)} style={{ marginBottom: 10 }} />
          <button className="btn btn-primary" onClick={handleGenerate}>Generate flashcards</button>
          {status && <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 10 }}>{status}</p>}
        </div>
      )}
    </div>
  )
}
