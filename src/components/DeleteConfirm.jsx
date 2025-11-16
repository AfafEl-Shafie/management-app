import { useTranslation } from '../hooks/useTranslation'

function DeleteConfirm({ onConfirm, onCancel, language }) {
  const { t } = useTranslation(language)

  return (
    <div className="alert-overlay">
      <div className="alert-dialog">
        <h3>{t('deleteConfirmTitle')}</h3>
        <p>{t('deleteConfirmMessage')}</p>
        <div className="alert-footer">
          <button className="secondary" onClick={onCancel}>
            {t('cancel')}
          </button>
          <button className="danger" onClick={onConfirm}>
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm
