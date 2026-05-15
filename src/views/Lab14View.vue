<template>
  <div class="lab14">
    <header class="lab-header">
      <h1>Lab 14: Routing TodoList</h1>
      <p class="subtitle">Using Vue Router with nested routes • Data stored in LocalStorage</p>
    </header>
    <main class="lab-content">
      <router-view />
    </main>
    <footer class="lab-footer">
      <p>Using Vue Router with nested routes • Data stored in LocalStorage</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const STORAGE_KEY = 'lab14-todos'

onMounted(() => {
  // Очистка некорректных задач из localStorage
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      console.log('Задачи в localStorage перед очисткой:', parsed)
      
      const validTasks = parsed.filter((t: any) => {
        // Проверяем, что id существует и является положительным числом
        const id = t.id
        const hasValidId = id !== null && id !== undefined && !isNaN(Number(id)) && Number(id) > 0
        const hasValidTitle = t.title && String(t.title).trim() !== ''
        const hasValidDate = t.createdAt && !isNaN(new Date(t.createdAt).getTime())
        return hasValidId && hasValidTitle && hasValidDate
      })
      
      if (validTasks.length !== parsed.length) {
        console.log(`Удалено ${parsed.length - validTasks.length} некорректных задач из localStorage`)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(validTasks))
        // Принудительно перезагружаем страницу, чтобы обновить store
        setTimeout(() => {
          window.location.reload()
        }, 100)
      }
    } catch (e) {
      console.error('Ошибка при обработке localStorage:', e)
      // Если данные повреждены, очищаем полностью
      localStorage.removeItem(STORAGE_KEY)
    }
  }
})
</script>

<style scoped>
.lab14 {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.lab-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 2rem 2rem 1.5rem;
  border-bottom: 3px solid #1976d2;
  text-align: center;
}

.lab-header h1 {
  margin: 0 0 0.5rem;
  font-size: 2.5rem;
  color: #2c3e50;
}

.subtitle {
  margin: 0;
  font-size: 1.1rem;
  color: #7f8c8d;
}

.lab-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.lab-footer {
  background: #333;
  color: #aaa;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  border-top: 1px solid #444;
}
</style>