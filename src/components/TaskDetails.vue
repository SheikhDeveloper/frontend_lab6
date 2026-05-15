<template>
  <div class="task-details">
    <div v-if="!task" class="not-found">
      <h2>Task Not Found</h2>
      <p>The requested task does not exist.</p>
      <router-link to="/lab14/" class="btn btn-secondary">Back to List</router-link>
    </div>
    <div v-else class="container">
      <div class="task-header">
        <h2>Task Details</h2>
        <router-link to="/lab14/" class="btn btn-secondary">← Back</router-link>
      </div>
      <div class="task-content">
        <div class="field">
          <span class="label">ID:</span>
          <span class="value">{{ task.id }}</span>
        </div>
        <div class="field">
          <span class="label">Title:</span>
          <span class="value">{{ task.title }}</span>
        </div>
        <div class="field">
          <span class="label">Status:</span>
          <span class="value status" :class="{ completed: task.completed }">
            {{ task.completed ? 'Completed' : 'Pending' }}
          </span>
        </div>
        <div class="field">
          <span class="label">Created:</span>
          <span class="value">{{ formatDate(task.createdAt) }}</span>
        </div>
      </div>
      <div class="task-actions">
        <router-link :to="`/lab14/task/${task.id}/complete`" class="btn btn-warning">
          {{ task.completed ? 'Mark Incomplete' : 'Mark Complete' }}
        </router-link>
        <router-link :to="`/lab14/task/${task.id}/delete`" class="btn btn-danger">Delete Task</router-link>
        <router-link to="/lab14/" class="btn btn-secondary">Back to List</router-link>
      </div>
      <div class="navigation">
        <router-link v-if="prevTask" :to="`/lab14/task/${prevTask.id}`" class="btn btn-outline">
          ← Previous Task
        </router-link>
        <router-link v-if="nextTask" :to="`/lab14/task/${nextTask.id}`" class="btn btn-primary">
          Next Task →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLab14TodoStore } from '@/composables/useLab14TodoStore'
import type { Lab14Task } from '@/types/lab14'

const route = useRoute()
const store = useLab14TodoStore()

const taskId = computed(() => {
  const idParam = route.params.id
  if (Array.isArray(idParam)) {
    return parseInt(idParam[0] || '0')
  }
  return parseInt(idParam || '0')
})

const isValidId = computed(() => !isNaN(taskId.value) && taskId.value > 0)
const task = computed(() => isValidId.value ? store.getTask(taskId.value) : undefined)

const tasks = store.tasks
const prevTask = computed(() => {
  if (!isValidId.value || !task.value) return null
  const index = tasks.value.findIndex((t: Lab14Task) => t.id === taskId.value)
  return index > 0 ? tasks.value[index - 1] : null
})
const nextTask = computed(() => {
  if (!isValidId.value || !task.value) return null
  const index = tasks.value.findIndex((t: Lab14Task) => t.id === taskId.value)
  return index < tasks.value.length - 1 ? tasks.value[index + 1] : null
})

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.task-details {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.not-found {
  text-align: center;
  padding: 3rem;
  background: #f8d7da;
  border-radius: 12px;
  color: #721c24;
}

.not-found h2 {
  margin-top: 0;
}

.container {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.task-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 2rem;
}

.task-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.field {
  display: flex;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f1f1f1;
}

.field:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.label {
  flex: 0 0 120px;
  font-weight: 600;
  color: #495057;
}

.value {
  flex: 1;
  color: #212529;
}

.status.completed {
  color: #28a745;
  font-weight: 600;
}

.task-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.navigation {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  text-align: center;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background: #e0a800;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-outline {
  background: transparent;
  color: #495057;
  border: 2px solid #dee2e6;
}

.btn-outline:hover {
  background: #f8f9fa;
}
</style>