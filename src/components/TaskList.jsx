import { useTranslation } from '../hooks/useTranslation'

function TaskList({ tasks, onEdit, onDelete, language }) {
  const { t } = useTranslation(language)

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>{t('id')}</th>
            <th>{t('taskTitle')}</th>
            <th>{t('dueDate')}</th>
            <th>{t('subtasks')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>
                <div>
                  <strong>{task.title}</strong>
                  {task.description && (
                    <p style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: '0.25rem' }}>
                      {task.description}
                    </p>
                  )}
                </div>
              </td>
              <td>{formatDate(task.dueDate)}</td>
              <td>
                {task.subtasks && task.subtasks.length > 0 ? (
                  <div style={{ fontSize: '0.875rem' }}>
                    {task.subtasks.map((subtask, idx) => (
                      <div key={idx} style={{ marginBottom: '0.25rem' }}>
                        • {subtask}
                      </div>
                    ))}
                  </div>
                ) : (
                  '-'
                )}
              </td>
              <td>
                <div className="actions">
                  <button className="secondary" onClick={() => onEdit(task)}>
                    ✏️ {t('edit')}
                  </button>
                  <button className="danger" onClick={() => onDelete(task.id)}>
                    🗑️ {t('delete')}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList
