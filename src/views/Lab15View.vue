<template>
  <div class="lab15">
    <header class="header">
      <h1>Lab 15: State Management with Pinia</h1>
      <p class="subtitle">TodoList using Pinia store for state management</p>
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
        <div class="add-form">
          <input
            v-model="newTaskTitle"
            type="text"
            placeholder="Enter task title"
            class="task-input"
            @keyup.enter="addTask"
          />
          <button class="btn btn-primary" @click="addTask" :disabled="!newTaskTitle.trim()">
            Add Task
          </button>
        </div>
        <div class="control-buttons">
          <button class="btn btn-warning" @click="clearAll" :disabled="tasks.length === 0">
            Clear All
          </button>
        </div>
      </div>

      <div v-if="tasks.length === 0" class="empty-state">
        <p>No tasks yet. Add a new task to get started.</p>
      </div>

      <div v-else class="task-list">
        <div v-for="task in tasks" :key="task.id" class="task-item" :class="{ completed: task.completed }">
          <div class="task-info">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleTask(task.id)"
              class="checkbox"
            />
            <div class="details">
              <h3>{{ task.title }}</h3>
              <p class="meta">ID: {{ task.id }} • Created: {{ formatDate(task.createdAt) }}</p>
            </div>
          </div>
          <div class="actions">
            <button class="btn btn-danger" @click="deleteTask(task.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore()

const tasks = computed(() => store.tasks)
const totalTasks = computed(() => store.totalTasks)
const completedTasks = computed(() => store.completedTasks)
const pendingTasks = computed(() => store.pendingTasks)

const newTaskTitle = ref('')

function addTask() {
  if (!newTaskTitle.value.trim()) return
  store.addTask({
    title: newTaskTitle.value.trim(),
    completed: false
  })
  newTaskTitle.value = ''
}

function toggleTask(id: number) {
  store.toggleTask(id)
}

function deleteTask(id: number) {
  store.deleteTask(id)
}

function clearAll() {
  store.clearAll()
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.lab15 {
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

.add-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.task-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.task-input:focus {
  outline: none;
  border-color: #007bff;
}

.control-buttons {
  display: flex;
  gap: 1rem;
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

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
}

.btn-primary:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
}

.btn-warning:hover:not(:disabled) {
  background: #e0a800;
}

.btn-warning:disabled {
  background: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: #6c757d;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.task-item:hover {
  transform: translateY(-2px);
}

.task-item.completed {
  opacity: 0.7;
  background: #f8f9fa;
}

.task-item.completed .details h3 {
  text-decoration: line-through;
  color: #6c757d;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.checkbox {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}

.details h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  color: #2c3e50;
}

.meta {
  margin: 0;
  font-size: 0.9rem;
  color: #6c757d;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

</style>