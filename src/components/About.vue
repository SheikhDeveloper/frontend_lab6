<template>
  <div class="about">
    <div class="container">
      <div class="header">
        <h2>About This Todo List</h2>
        <router-link to="/lab14/" class="btn btn-secondary">Back to List</router-link>
      </div>

      <div class="content">
        <div class="card">
          <h3>Lab 14: Routing TodoList</h3>
          <p>
            This application demonstrates advanced routing features with Vue Router.
            It's a single‑page TodoList that uses LocalStorage for persistence (no server interaction).
          </p>

          <div class="features">
            <h4>Features</h4>
            <ul>
              <li>Add, edit, delete, and mark tasks as completed</li>
              <li>Each task has a unique ID (1, 2, 3, …)</li>
              <li>Full routing with nested routes</li>
              <li>Task‑specific URLs: <code>/lab14/task/<id></code></li>
              <li>Action routes: <code>/lab14/task/<id>/delete</code> and <code>/lab14/task/<id>/complete</code></li>
              <li>Responsive, clean UI with professional styling</li>
              <li>All data persists in browser LocalStorage</li>
            </ul>
          </div>

          <div class="routes">
            <h4>Available Routes</h4>
            <table>
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>/lab14/</code></td>
                  <td>List all tasks</td>
                </tr>
                <tr>
                  <td><code>/lab14/add</code></td>
                  <td>Form to add a new task</td>
                </tr>
                <tr>
                  <td><code>/lab14/task/:id</code></td>
                  <td>View details of a specific task</td>
                </tr>
                <tr>
                  <td><code>/lab14/task/:id/delete</code></td>
                  <td>Delete a task (with confirmation message)</td>
                </tr>
                <tr>
                  <td><code>/lab14/task/:id/complete</code></td>
                  <td>Toggle completion status (with message)</td>
                </tr>
                <tr>
                  <td><code>/lab14/about</code></td>
                  <td>This about page</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="tech">
            <h4>Technology Stack</h4>
            <div class="tech-list">
              <span class="badge">Vue 3</span>
              <span class="badge">TypeScript</span>
              <span class="badge">Vue Router</span>
              <span class="badge">LocalStorage</span>
              <span class="badge">CSS3 / Flexbox</span>
            </div>
          </div>

          <div class="footer">
            <p>This project is part of the Frontend Lab 14 assignment.</p>
            <p>All rights reserved © 2026</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about {
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
}

.header h2 {
  margin: 0;
  font-size: 2rem;
  color: #2c3e50;
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

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
}

.card h3 {
  margin-top: 0;
  color: #1976d2;
  font-size: 1.8rem;
}

.card p {
  line-height: 1.6;
  color: #555;
}

.features, .routes, .tech {
  margin-top: 2rem;
}

h4 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

ul {
  padding-left: 1.5rem;
  color: #555;
}

li {
  margin-bottom: 0.5rem;
}

code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
  color: #d63384;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}

thead {
  background: #f8f9fa;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #dee2e6;
}

th {
  font-weight: 600;
  color: #333;
}

tbody tr:nth-child(even) {
  background: #f9f9f9;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  text-align: center;
  color: #777;
  font-size: 0.9rem;
}
</style>