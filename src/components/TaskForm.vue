<template>
  <div class="task-form">
    <div class="container">
      <h2>Add New Task</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Task Title</label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="Enter task description"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="completed" class="checkbox" />
            <span>Completed</span>
          </label>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="!title.trim()">
            Add Task
          </button>
          <router-link to="/lab14/" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
      <div v-if="showSuccess" class="success-message">
        Task added successfully! Redirecting...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLab14TodoStore } from '@/composables/useLab14TodoStore'

const router = useRouter()
const store = useLab14TodoStore()

const title = ref('')
const completed = ref(false)
const showSuccess = ref(false)

function handleSubmit() {
  if (!title.value.trim()) return

  store.addTask({
    title: title.value.trim(),
    completed: completed.value
  })

  showSuccess.value = true
  resetForm()

  setTimeout(() => {
    router.push('/lab14/')
  }, 1500)
}

function resetForm() {
  title.value = ''
  completed.value = false
}
</script>

<style scoped>
.task-form {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.container {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-top: 0;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #495057;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox {
  width: 1.25rem;
  height: 1.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  text-align: center;
  text-decoration: none;
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

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.success-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}
</style>