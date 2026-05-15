<template>
  <div class="lab12">
    <header class="header">
      <h1>Lab 12: Advanced Vue TodoList</h1>
      <p class="subtitle">Vue Composition API with localStorage & JSONPlaceholder integration</p>
    </header>

    <div class="container">
      <div class="stats">
        <div class="stat-card">
          <h3>Total Tasks</h3>
          <p class="stat-number">{{ totalTasks }}</p>
        </div>
        <div class="stat-card">
          <h3>Completed</h3>
          <p class="stat-number completed">{{ completedTasks }}</p>
        </div>
        <div class="stat-card">
          <h3>Pending</h3>
          <p class="stat-number pending">{{ pendingTasks }}</p>
        </div>
      </div>

      <div class="controls">
        <TodoForm
          :isLoading="isLoading"
          :error="error"
          @add="addTask"
        />
        <div class="control-buttons">
          <button class="btn btn-secondary" @click="fetchTasks" :disabled="isLoading">
            {{ isLoading ? 'Loading...' : 'Fetch from API' }}
          </button>
          <button class="btn btn-warning" @click="clearAll" :disabled="tasks.length === 0">
            Clear All
          </button>
        </div>
      </div>

      <div v-if="error" class="error-alert">
        <strong>API Error:</strong> {{ error }}
      </div>

      <div v-if="isLoading && tasks.length === 0" class="loading">
        Loading tasks...
      </div>

      <div v-else-if="tasks.length === 0" class="empty-state">
        <p>No tasks yet. Add a new task or fetch from API.</p>
      </div>

      <div v-else class="todo-list">
        <TodoItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          :isLoading="isLoading"
          @toggle="toggleTask(task.id)"
          @delete="openDeletePopup(task)"
        />
      </div>
    </div>

    <!-- Confirmation Popup -->
    <Popup :isOpen="deletePopupOpen" @close="closeDeletePopup">
      <template #default>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the task <strong>"{{ taskToDelete?.title }}"</strong>?</p>
        <p class="warning-text">This action cannot be undone.</p>
      </template>
      <template #actions>
        <button class="btn btn-cancel" @click="closeDeletePopup">
          Cancel
        </button>
        <button class="btn btn-danger" @click="confirmDelete" :disabled="isLoading">
          {{ isLoading ? 'Deleting...' : 'Delete Task' }}
        </button>
      </template>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TodoForm from '@/components/TodoForm.vue'
import TodoItem from '@/components/TodoItem.vue'
import Popup from '@/components/Popup.vue'
import { useTodoStore } from '@/composables/useTodoStore'
import type { TodoTask } from '@/types/todo'

const {
  tasks,
  isLoading,
  error,
  totalTasks,
  completedTasks,
  pendingTasks,
  fetchTasks,
  addTask: storeAddTask,
  toggleTask: storeToggleTask,
  deleteTask: storeDeleteTask,
  clearAll
} = useTodoStore()

const deletePopupOpen = ref(false)
const taskToDelete = ref<TodoTask | null>(null)

function openDeletePopup(task: TodoTask) {
  taskToDelete.value = task
  deletePopupOpen.value = true
}

function closeDeletePopup() {
  deletePopupOpen.value = false
  taskToDelete.value = null
}

async function confirmDelete() {
  if (taskToDelete.value) {
    await storeDeleteTask(taskToDelete.value.id)
    closeDeletePopup()
  }
}

function addTask(title: string) {
  storeAddTask(title)
}

function toggleTask(id: number) {
  storeToggleTask(id)
}
</script>

<style scoped>
.lab12 {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
}

.container {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.stats {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: #2c3e50;
}

.stat-number.completed {
  color: #28a745;
}

.stat-number.pending {
  color: #ffc107;
}

.controls {
  margin-bottom: 2.5rem;
}

.control-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #5a6268;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover:not(:disabled) {
  background-color: #e0a800;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background-color: #5a6268;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c82333;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-alert {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #f5c6cb;
}

.loading, .empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: #6c757d;
  font-size: 1.2rem;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.warning-text {
  color: #dc3545;
  font-weight: 500;
}
</style>