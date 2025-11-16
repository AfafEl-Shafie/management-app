import { useState, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'

function TaskForm({ task, onSave, onCancel, language }) {
  const { t } = useTranslation(language)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    subtasks: []
  })
  const [errors, setErrors] = useState({})
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate || '',
        subtasks: task.subtasks || []
      })
    }
  }, [task])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setIsDirty(true)
  }

  const handleAddSubtask = () => {
    setFormData(prev => ({
      ...prev,
      subtasks: [...prev.subtasks, '']
    }))
    setIsDirty(true)
  }

  const handleSubtaskChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.map((subtask, i) => i === index ? value : subtask)
    }))
    setIsDirty(true)
  }

  const handleRemoveSubtask = (index) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index)
    }))
    setIsDirty(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const filteredSubtasks = formData.subtasks.filter(s => s.trim())
    
    if (task) {
      onSave({
        ...task,
        ...formData,
        subtasks: filteredSubtasks
      })
    } else {
      onSave({
        ...formData,
        subtasks: filteredSubtasks
      })
    }
  }

  const handleCancel = () => {
    if (isDirty) {
      const confirmed = window.confirm(t('unsavedChanges') || 'You have unsaved changes. Are you sure you want to cancel?')
      if (!confirmed) return
    }
    onCancel()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{task ? t('editTask') : t('addNewTask')}</h2>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">{t('taskTitle')} *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={t('taskTitle')}
              maxLength="255"
            />
            {errors.title && <span style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">{t('description')}</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t('description')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">{t('dueDate')}</label>
            <input
              id="dueDate"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>{t('subtasks')}</label>
            <div className="subtasks-list">
              {formData.subtasks.map((subtask, index) => (
                <div key={index} className="subtask-item">
                  <input
                    type="text"
                    value={subtask}
                    onChange={(e) => handleSubtaskChange(index, e.target.value)}
                    placeholder={`${t('subtaskTitle')} ${index + 1}`}
                    maxLength="255"
                  />
                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleRemoveSubtask(index)}
                  >
                    {t('removeSubtask')}
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="secondary"
              onClick={handleAddSubtask}
              style={{ marginTop: '0.5rem' }}
            >
              ➕ {t('addSubtask')}
            </button>
          </div>

          <div className="modal-footer">
            <button type="button" className="secondary" onClick={handleCancel}>
              {t('cancel')}
            </button>
            <button type="submit" className="primary">
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
