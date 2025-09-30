<template>
  <main class="app">
    <h1>Todo App</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search todos..."
      class="search"
    />

    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add new todo" />
      <button>Add</button>
    </form>

    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
        All
      </button>
      <button
        :class="{ active: filter === 'active' }"
        @click="filter = 'active'"
      >
        Active
      </button>
      <button
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Completed
      </button>
    </div>
    <ul>
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @remove="removeTodo"
        @update="updateTodo"
      />
    </ul>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import TodoItem from "./components/TodoItem.vue";

const newTodo = ref("");
const todos = ref([]);
const filter = ref("all"); // 'all' | 'active' | 'completed'
const searchQuery = ref("");

const filteredTodos = computed(() => {
  const query = searchQuery.value.toLowerCase();
  console.log("query", query);

  return todos.value
    .filter((todo) => {
      if (filter.value === "active") return !todo.done;
      if (filter.value === "completed") return todo.done;
      return true;
    })
    .filter((todo) => {
      return todo.text.toLowerCase().includes(query);
    });
});

function addTodo() {
  if (newTodo.value.trim() === "") return;

  todos.value.push({
    id: Date.now(),
    text: newTodo.value,
    done: false,
  });

  newTodo.value = "";
}

function toggleTodo(id) {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) todo.done = !todo.done;
}

function removeTodo(id) {
  todos.value = todos.value.filter((t) => t.id !== id);
}

function updateTodo({ id, text }) {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    todo.text = text;
  }
}

onMounted(() => {
  const saved = localStorage.getItem("todos");
  if (saved) {
    try {
      todos.value = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse todos from localStorage");
    }
  }
});

watch(
  todos,
  (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  },
  { deep: true }
);
</script>

<style scoped>
.app {
  max-width: 500px;
  margin: 2rem auto;
  font-family: sans-serif;
}
input {
  padding: 0.5rem;
  width: 70%;
}
button {
  padding: 0.5rem;
}
ul {
  list-style: none;
  padding: 0;
  text-align: left;
}
.filters {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
}
.filters button {
  padding: 0.4rem 0.8rem;
  border: none;
  background: #eee;
  cursor: pointer;
}
.filters button.active {
  background: #3f51b5;
  color: white;
}
.search {
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  font-size: 1rem;
}
</style>
