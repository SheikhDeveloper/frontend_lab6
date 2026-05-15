<template>
  <div class="todo-item" :class="{ completed: task.completed }">
    <div class="todo-checkbox">
      <input
        type="checkbox"
        :id="'todo-' + task.id"
        :checked="task.completed"
        @change="toggle"
        :disabled="isLoading"
      />
      <label :for="'todo-' + task.id" class="sr-only">Toggle completion</label>
    </div>
    <div class="todo-content">
      <h3 class="todo-title">{{ task.title }}</h3>
      <div class="todo-meta">
        <span class="todo-id">ID: {{ task.id }}</span>
        <span class="todo-user">User: {{ task.userId }}</span>
        <span class="todo-status" :class="task.completed ? 'completed' : 'pending'">
          {{ task.completed ? 'Completed' : 'Pending' }}
        </span>
      </div>
    </div>
    <div class="todo-actions">
      <button
        class="btn btn-delete"
        @click="emitDelete"
        :disabled="isLoading"
        aria-label="Delete task"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoTask } from '@/types/todo'

defineProps<{
  task: TodoTask
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'delete'): void
}>()

function toggle() {
  emit('toggle')
}

function emitDelete() {
  emit('delete')
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  gap: 1.5rem;
}

.todo-item:hover {
  border-color: #b0b0b0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.todo-item.completed {
  background-color: #f8fff8;
  border-color: #c6e6c6;
}

.todo-checkbox input[type="checkbox"] {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  accent-color: #4caf50;
}

.todo-content {
  flex: 1;
}

.todo-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #777;
}

.todo-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.todo-id,
.todo-user {
  padding: 0.2rem 0.5rem;
  background: #f0f0f0;
  border-radius: 4px;
}

.todo-status {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.todo-status.completed {
  background: #d4edda;
  color: #155724;
}

.todo-status.pending {
  background: #fff3cd;
  color: #856404;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-delete {
  background: #f8d7da;
  color: #721c24;
}

.btn-delete:hover:not(:disabled) {
  background: #f5c6cb;
}

.btn-delete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>