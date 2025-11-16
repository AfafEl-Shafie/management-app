const translations = {
  en: {
    appTitle: 'Task Management App',
    tasks: 'Tasks',
    addTask: 'Add Task',
    noTasks: 'No tasks yet. Create one to get started!',
    taskTitle: 'Task Title',
    description: 'Description',
    dueDate: 'Due Date',
    subtasks: 'Subtasks',
    addSubtask: 'Add Subtask',
    removeSubtask: 'Remove',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    actions: 'Actions',
    deleteConfirmTitle: 'Delete Task?',
    deleteConfirmMessage: 'This action cannot be undone. The task and all its subtasks will be permanently deleted.',
    confirm: 'Delete',
    allRightsReserved: 'All rights reserved.',
    editTask: 'Edit Task',
    addNewTask: 'Add New Task',
    id: 'ID',
    createdAt: 'Created At',
    subtaskTitle: 'Subtask',
  },
  ar: {
    appTitle: 'تطبيق إدارة المهام',
    tasks: 'المهام',
    addTask: 'إضافة مهمة',
    noTasks: 'لا توجد مهام حتى الآن. قم بإنشاء واحدة للبدء!',
    taskTitle: 'عنوان المهمة',
    description: 'الوصف',
    dueDate: 'تاريخ الاستحقاق',
    subtasks: 'المهام الفرعية',
    addSubtask: 'إضافة مهمة فرعية',
    removeSubtask: 'إزالة',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    actions: 'الإجراءات',
    deleteConfirmTitle: 'حذف المهمة؟',
    deleteConfirmMessage: 'لا يمكن التراجع عن هذا الإجراء. سيتم حذف المهمة وجميع مهامها الفرعية بشكل دائم.',
    confirm: 'حذف',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    editTask: 'تعديل المهمة',
    addNewTask: 'إضافة مهمة جديدة',
    id: 'الرقم',
    createdAt: 'تاريخ الإنشاء',
    subtaskTitle: 'مهمة فرعية',
  }
}

export function useTranslation(language) {
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return { t, language }
}
