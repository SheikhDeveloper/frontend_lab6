<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header>
      <div class="header-content">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="60" height="60" />
        <h1>Vue 3 Lab Works</h1>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/lab12">Lab 12 (API)</RouterLink>
        <RouterLink to="/lab13">Lab 13 (Validation)</RouterLink>
        <RouterLink to="/lab14">Lab 14 (Routing)</RouterLink>
        <RouterLink to="/lab15">Lab 15 (Pinia)</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>Foundation for implementing all four lab works</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: var(--color-background-mute);
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--color-border);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.logo {
  display: block;
}

h1 {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

nav a {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  text-decoration: none;
  transition: background-color 0.2s;
}

nav a:hover {
  background-color: var(--color-background-hover);
}

nav a.router-link-exact-active {
  background-color: var(--color-primary);
  color: white;
}

main {
  flex: 1;
  padding: 2rem;
}

footer {
  padding: 1rem 2rem;
  text-align: center;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-background-mute);
  color: var(--color-text-muted);
}
</style>
