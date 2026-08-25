import React, { useState } from 'react'

export default function Settings({ apiKey, setApiKey }) {
  const [draft, setDraft] = useState(apiKey || '')
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    setApiKey(draft.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="card">
      <h2 className="section-title">Settings</h2>
      <p className="section-desc">
        Quiz and flashcard generation uses the free Gemini API. Get a key at{' '}
        <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">aistudio.google.com/apikey</a>{' '}
        — it's stored only in this browser, never uploaded anywhere.
      </p>
      <form onSubmit={handleSave} className="row">
        <input
          type="password"
          placeholder="Paste Gemini API key"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      {saved && <p style={{ fontSize: 12.5, color: 'var(--sage)', marginTop: 8 }}>Saved.</p>}
    </div>
  )
}
