<template>
  <Teleport to="body">
    <div v-if="isOpen" class="popup-overlay" @click.self="close">
      <div class="popup-content">
        <button class="popup-close" @click="close" aria-label="Close">
          &times;
        </button>
        <div class="popup-body">
          <slot />
        </div>
        <div class="popup-actions" v-if="hasActions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const hasActions = computed(() => {
  // Check if slot "actions" has content
  // This is a simple implementation; in real scenario you might use useSlots
  return true // assume there are actions; could be improved
})

function close() {
  emit('close')
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.popup-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
}

.popup-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: #888;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.popup-close:hover {
  background-color: #f0f0f0;
  color: #333;
}

.popup-body {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #333;
}

.popup-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>