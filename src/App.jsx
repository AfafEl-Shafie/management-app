import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import DeleteConfirm from './components/DeleteConfirm'
import { useTranslation } from './hooks/useTranslation'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [language, setLanguage] = useState('en')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { t } = useTranslation(language)

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    const savedLanguage = localStorage.getItem('language') || 'en'
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
    setLanguage(savedLanguage)
    setIsDarkMode(savedDarkMode)

    if (savedDarkMode) {
      document.body.classList.add('dark-mode')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode)
  }, [isDarkMode])

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
    setShowForm(false)
  }

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ))
    setEditingTask(null)
    setShowForm(false)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    setDeleteConfirm(null)
  }

  const handleOpenForm = (task = null) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    if (newDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>{t('appTitle')}</h1>
        <div className="header-controls">
          <button className="secondary" onClick={toggleLanguage}>
            🌐 {language.toUpperCase()}
          </button>
          <button className="secondary" onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>{t('tasks')}</h2>
            <button className="primary" onClick={() => handleOpenForm()}>
              ➕ {t('addTask')}
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>{t('noTasks')}</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={handleOpenForm}
              onDelete={(taskId) => setDeleteConfirm(taskId)}
              language={language}
            />
          )}
        </div>
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={editingTask ? handleEditTask : handleAddTask}
          onCancel={handleCloseForm}
          language={language}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirm
          onConfirm={() => handleDeleteTask(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
          language={language}
        />
      )}

      <footer className="footer">
        <p>&copy; 2025 {t('appTitle')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  )
}

export default App
