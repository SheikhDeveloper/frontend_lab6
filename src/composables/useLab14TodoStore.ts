import { ref, computed, watch } from 'vue'

export interface Lab14Task {
  id: number
  title: string
  completed: boolean
  createdAt: Date
}

export interface NewLab14Task {
  title: string
  completed?: boolean
}

const STORAGE_KEY = 'lab14-todos'

export function useLab14TodoStore() {
  const stored = localStorage.getItem(STORAGE_KEY)
  let initialTasks: Lab14Task[] = []
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      initialTasks = parsed
        .map((t: any) => ({
          id: Number(t.id),
          title: String(t.title || '').trim(),
          completed: Boolean(t.completed),
          createdAt: new Date(t.createdAt)
        }))
        .filter((t: Lab14Task) => (
          !isNaN(t.id) &&
          t.id > 0 &&
          t.title.length > 0 &&
          !isNaN(t.createdAt.getTime())
        ))
    } catch {
      initialTasks = []
    }
  }

  const tasks = ref<Lab14Task[]>(initialTasks)

  // Cleanup any invalid tasks that might have slipped through
  if (tasks.value.length > 0) {
    const validTasks = tasks.value.filter(t => (
      !isNaN(t.id) &&
      t.id > 0 &&
      t.title.length > 0 &&
      !isNaN(t.createdAt.getTime())
    ))
    if (validTasks.length !== tasks.value.length) {
      tasks.value = validTasks
    }
  }

  watch(tasks, (newTasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
  }, { deep: true })

  const getNextId = (): number => {
    if (tasks.value.length === 0) return 1
    const validIds = tasks.value.map(t => t.id).filter(id => !isNaN(id) && id > 0)
    if (validIds.length === 0) return 1
    const maxId = Math.max(...validIds)
    return maxId + 1
  }

  const addTask = (newTask: NewLab14Task): Lab14Task | null => {
    const title = newTask.title?.trim()
    if (!title) return null

    const task: Lab14Task = {
      id: getNextId(),
      title,
      completed: newTask.completed ?? false,
      createdAt: new Date()
    }
    
    tasks.value.push(task)
    return task
  }

  const deleteTask = (id: number): boolean => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
      return true
    }
    return false
  }

  const toggleTask = (id: number): boolean => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      return true
    }
    return false
  }

  const getTask = (id: number): Lab14Task | undefined => {
    return tasks.value.find(t => t.id === id)
  }

  const updateTask = (id: number, updates: Partial<Lab14Task>): boolean => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      Object.assign(task, updates)
      return true
    }
    return false
  }

  const clearAll = () => {
    tasks.value = []
  }

  const totalTasks = computed(() => tasks.value.length)
  const completedTasks = computed(() => tasks.value.filter(t => t.completed).length)
  const pendingTasks = computed(() => tasks.value.filter(t => !t.completed).length)

  return {
    tasks,
    totalTasks,
    completedTasks,
    pendingTasks,
    addTask,
    deleteTask,
    toggleTask,
    getTask,
    updateTask,
    clearAll
  }
}