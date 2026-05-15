import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Lab14Task, NewLab14Task } from '@/composables/useLab14TodoStore'

const STORAGE_KEY = 'lab15-todos'

export const useTodoStore = defineStore('todo', () => {
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

  watch(tasks, (newTasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
  }, { deep: true })

  const totalTasks = computed(() => tasks.value.length)
  const completedTasks = computed(() => tasks.value.filter(t => t.completed).length)
  const pendingTasks = computed(() => tasks.value.filter(t => !t.completed).length)

  function getNextId(): number {
    if (tasks.value.length === 0) return 1
    return Math.max(...tasks.value.map(t => t.id)) + 1
  }

  function addTask(newTask: NewLab14Task): Lab14Task | null {
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

  function deleteTask(id: number) {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
      return true
    }
    return false
  }

  function toggleTask(id: number) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      return true
    }
    return false
  }

  function getTask(id: number): Lab14Task | undefined {
    return tasks.value.find(t => t.id === id)
  }

  function updateTask(id: number, updates: Partial<Lab14Task>) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      Object.assign(task, updates)
      return true
    }
    return false
  }

  function clearAll() {
    tasks.value = []
  }

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
})