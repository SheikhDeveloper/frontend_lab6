<template>
  <div class="task-complete">
    <div v-if="processing" class="processing container">
      <h3>Updating task status...</h3>
      <p>Please wait while we update the task.</p>
    </div>
    <div v-else-if="updated" class="updated container">
      <h3>Task status has been changed</h3>
      <p>The task has been marked as {{ newStatus }}.</p>
      <p>You will be redirected to the task list in {{ countdown }} seconds.</p>
      <div class="actions">
        <router-link :to="`/lab14/task/${taskId}`" class="btn btn-success">View Task</router-link>
        <router-link to="/lab14/" class="btn btn-primary">Go to Task List Now</router-link>
      </div>
    </div>
    <div v-else-if="notFound" class="not-found container">
      <h3>Task not found</h3>
      <p>The task with ID {{ taskId }} does not exist.</p>
      <router-link to="/lab14/" class="btn btn-secondary">Go to Task List</router-link>
    </div>
    <div v-else class="error container">
      <h3>Error updating task</h3>
      <p>Something went wrong while updating the task status.</p>
      <router-link to="/lab14/" class="btn btn-secondary">Go to Task List</router-link>
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

const taskId = ref(0)
const processing = ref(true)
const updated = ref(false)
const notFound = ref(false)
const newStatus = ref('')
const countdown = ref(3)

onMounted(() => {
  const idParam = route.params.id
  if (Array.isArray(idParam)) {
    taskId.value = parseInt(idParam[0] || '0')
  } else {
    taskId.value = parseInt(idParam || '0')
  }

  if (isNaN(taskId.value) || taskId.value <= 0) {
    notFound.value = true
    processing.value = false
    return
  }

  const task = store.getTask(taskId.value)
  if (!task) {
    notFound.value = true
    processing.value = false
    return
  }

  setTimeout(() => {
    const success = store.toggleTask(taskId.value)
    if (success) {
      updated.value = true
      processing.value = false
      const updatedTask = store.getTask(taskId.value)
      newStatus.value = updatedTask?.completed ? 'completed' : 'incomplete'

      const interval = setInterval(() => {
        countdown.value -= 1
        if (countdown.value <= 0) {
          clearInterval(interval)
          router.push('/lab14/')
        }
      }, 1000)
    } else {
      processing.value = false
    }
  }, 500)
})
</script>

<style scoped>
.task-complete {
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

.processing {
  background: #fff3cd;
  color: #856404;
}

.updated {
  background: #d4edda;
  color: #155724;
}

.not-found {
  background: #f8d7da;
  color: #721c24;
}

.error {
  background: #f8d7da;
  color: #721c24;
}

h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
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

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #218838;
}
</style>