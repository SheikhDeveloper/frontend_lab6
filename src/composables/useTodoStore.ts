import { ref, computed, watch } from 'vue'
import type { TodoTask, NewTodoTask } from '@/types/todo'
import axios from 'axios'

const API_BASE = 'https://jsonplaceholder.typicode.com/todos'
const USER_ID = 1 // Using user ID 1 for simplicity

const STORAGE_KEY = 'vue-todo-lab12'

export function useTodoStore() {
  // Load initial tasks from localStorage
  const stored = localStorage.getItem(STORAGE_KEY)
  const tasks = ref<TodoTask[]>(stored ? JSON.parse(stored) : [])

  // Save to localStorage whenever tasks change
  watch(tasks, (newTasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
  }, { deep: true })

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const totalTasks = computed(() => tasks.value.length)
  const completedTasks = computed(() => tasks.value.filter(t => t.completed).length)
  const pendingTasks = computed(() => tasks.value.filter(t => !t.completed).length)

  // API calls
  async function fetchTasks() {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get(API_BASE, {
        params: { userId: USER_ID, _limit: 5 }
      })
      // Merge with existing tasks? For simplicity, replace
      tasks.value = response.data.map((task: any) => ({
        id: task.id,
        title: task.title,
        completed: task.completed,
        userId: task.userId
      }))
    } catch (err) {
      error.value = 'Failed to fetch tasks from API'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  async function addTask(title: string) {
    if (!title.trim()) return
    
    isLoading.value = true
    error.value = null
    const newTask: NewTodoTask = {
      title: title.trim(),
      completed: false,
      userId: USER_ID
    }
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API timeout')), 10000)
      )
      const response = await Promise.race([
        axios.post(API_BASE, newTask),
        timeoutPromise
      ]) as any
      
      const created: TodoTask = {
        id: response.data.id,
        title: response.data.title,
        completed: response.data.completed,
        userId: response.data.userId
      }
      tasks.value.push(created)
    } catch (err) {
      error.value = 'Failed to add task via API. Added locally.'
      console.error(err)
      // Fallback: add locally with a temporary ID
      const tempId = Date.now()
      tasks.value.push({
        id: tempId,
        title: newTask.title,
        completed: false,
        userId: USER_ID
      })
    } finally {
      isLoading.value = false
    }
  }

  async function toggleTask(id: number) {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return

    const newCompleted = !task.completed
    isLoading.value = true
    error.value = null
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API timeout')), 10000)
      )
      await Promise.race([
        axios.patch(`${API_BASE}/${id}`, { completed: newCompleted }),
        timeoutPromise
      ])
      task.completed = newCompleted
    } catch (err) {
      error.value = 'Failed to update task via API. Reverted locally.'
      console.error(err)
      // Revert locally
      task.completed = !newCompleted
    } finally {
      isLoading.value = false
    }
  }

  async function deleteTask(id: number) {
    isLoading.value = true
    error.value = null
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API timeout')), 10000)
      )
      await Promise.race([
        axios.delete(`${API_BASE}/${id}`),
        timeoutPromise
      ])
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = 'Failed to delete task via API. Task not removed.'
      console.error(err)
      // Requirement: only after valid response should state change
      // So we don't delete locally on error
    } finally {
      isLoading.value = false
    }
  }

  // Clear all tasks (optional)
  function clearAll() {
    tasks.value = []
  }

  return {
    tasks,
    isLoading,
    error,
    totalTasks,
    completedTasks,
    pendingTasks,
    fetchTasks,
    addTask,
    toggleTask,
    deleteTask,
    clearAll
  }
}