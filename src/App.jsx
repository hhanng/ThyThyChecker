import React, { useState } from 'react'
import { load, save } from './utils/storage'
import { SUBJECTS, SCHEDULE, SEED_HOMEWORK, SEED_EXAMS } from './data/seedData'

import Schedule from './components/Schedule'
import Homework from './components/Homework'
import Exams from './components/Exams'
import Syllabus from './components/Syllabus'
import Practice from './components/Practice'
import DailyUpload from './components/DailyUpload'
import SubjectTracker from './components/SubjectTracker'
import ApiKeySettings from './components/ApiKeySettings'

const TABS = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'homework', label: 'Homework' },
  { id: 'exams', label: 'Exams' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'practice', label: 'Practice' },
  { id: 'upload', label: 'Daily Upload' },
  { id: 'performance', label: 'Performance' },
  { id: 'settings', label: 'Settings' },
]

function usePersisted(key, fallback) {
  const [value, setValue] = useState(() => load(key, fallback))
  const setAndSave = (next) => {
    setValue(next)
    save(key, next)
  }
  return [value, setAndSave]
}

export default function App() {
  const [tab, setTab] = useState('schedule')

  const [homework, setHomework] = usePersisted('homework', SEED_HOMEWORK)
  const [exams, setExams] = usePersisted('exams', SEED_EXAMS)
  const [notes, setNotes] = usePersisted('notes', {})
  const [flashcards, setFlashcards] = usePersisted('flashcards', [])
  const [uploads, setUploads] = usePersisted('uploads', [])
  const [quizzes, setQuizzes] = usePersisted('quizzes', [])
  const [apiKey, setApiKey] = usePersisted('apiKey', '')

  return (
    <div className="app-shell">
      <div className="app-header">
        <div>
          <h1 className="app-title">Study Hub</h1>
          <div className="app-subtitle">Schedule, homework, exams, and practice — all in one place</div>
        </div>
      </div>

      <div className="nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`nav-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'schedule' && <Schedule schedule={SCHEDULE} subjects={SUBJECTS} />}
      {tab === 'homework' && <Homework homework={homework} setHomework={setHomework} subjects={SUBJECTS} />}
      {tab === 'exams' && <Exams exams={exams} setExams={setExams} subjects={SUBJECTS} />}
      {tab === 'syllabus' && <Syllabus notes={notes} setNotes={setNotes} subjects={SUBJECTS} />}
      {tab === 'practice' && (
        <Practice flashcards={flashcards} setFlashcards={setFlashcards} subjects={SUBJECTS} apiKey={apiKey} />
      )}
      {tab === 'upload' && (
        <DailyUpload
          uploads={uploads} setUploads={setUploads}
          quizzes={quizzes} setQuizzes={setQuizzes}
          subjects={SUBJECTS} schedule={SCHEDULE} apiKey={apiKey}
        />
      )}
      {tab === 'performance' && <SubjectTracker quizzes={quizzes} subjects={SUBJECTS} />}
      {tab === 'settings' && <ApiKeySettings apiKey={apiKey} setApiKey={setApiKey} />}
    </div>
  )
}
