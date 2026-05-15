<template>
  <div class="task-delete">
    <div v-if="notFound" class="not-found container">
      <h2>Task Not Found</h2>
      <p>The task you are trying to delete does not exist.</p>
      <router-link to="/lab14/" class="btn btn-secondary">Back to List</router-link>
    </div>
    <div v-else>
      <div v-if="deleting" class="deleting container">
        <h2>Deleting Task...</h2>
        <div class="spinner"></div>
        <p>Please wait while we delete the task.</p>
      </div>
      <div v-if="deleted" class="deleted container">
        <h2>Task deleted</h2>
        <p>The task has been successfully deleted.</p>
        <p>You will be redirected back to the task list in {{ countdown }} seconds.</p>
        <router-link to="/lab14/" class="btn btn-primary">Go Now</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLab14TodoStore } from '@/composables/useLab14TodoStore'

const route = useRoute()
const router = useRouter()
const store = useLab14TodoStore()

const taskId = parseInt(route.params.id as string)
const deleting = ref(true)
const deleted = ref(false)
const notFound = ref(false)
const countdown = ref(3)

onMounted(() => {
  const task = store.getTask(taskId)
  if (!task) {
    notFound.value = true
    deleting.value = false
    return
  }

  setTimeout(() => {
    const success = store.deleteTask(taskId)
    if (success) {
      deleted.value = true
      deleting.value = false
      const interval = setInterval(() => {
        countdown.value--
        if (countdown.value === 0) {
          clearInterval(interval)
          router.push('/lab14/')
        }
      }, 1000)
    }
  }, 1500)
})
</script>

<style scoped>
.task-delete {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.container {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.not-found {
  background: #f8d7da;
  color: #721c24;
}

.deleting {
  background: #fff3cd;
  color: #856404;
}

.deleted {
  background: #d4edda;
  color: #155724;
}

h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0,0,0,0.1);
  border-radius: 50%;
  border-top-color: #007bff;
  animation: spin 1s ease-in-out infinite;
  margin: 1rem 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
  display: inline-block;
  margin-top: 1rem;
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
</style>