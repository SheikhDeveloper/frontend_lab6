<template>
  <form class="todo-form" @submit.prevent="submit">
    <div class="form-group">
      <label for="new-task-title" class="sr-only">New Task Title</label>
      <input
        id="new-task-title"
        v-model="title"
        type="text"
        placeholder="What needs to be done?"
        required
        :disabled="isLoading"
        class="form-input"
      />
      <button type="submit" class="btn btn-primary" :disabled="isLoading || !title.trim()">
        {{ isLoading ? 'Adding...' : 'Add Task' }}
      </button>
    </div>
    <div v-if="error" class="form-error">
      {{ error }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isLoading?: boolean
  error?: string | null
}>()

const emit = defineEmits<{
  (e: 'add', title: string): void
}>()

const title = ref('')

function submit() {
  const trimmed = title.value.trim()
  if (trimmed) {
    emit('add', trimmed)
    title.value = ''
  }
}
</script>

<style scoped>
.todo-form {
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.form-input {
  flex: 1;
  padding: 0.875rem 1.25rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.btn {
  padding: 0.875rem 1.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #4caf50;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #3d8b40;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-error {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 6px;
  font-size: 0.9rem;
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