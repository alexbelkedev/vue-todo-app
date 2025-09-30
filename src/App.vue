<template>
  <main class="app">
    <h1>Todo App</h1>

    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add new todo" />
      <button>Add</button>
    </form>

    <ul>
      <TodoItem
        v-for="todo in todos"
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
import { onMounted, ref, watch } from "vue";
import TodoItem from "./components/TodoItem.vue";

const newTodo = ref("");
const todos = ref([]);

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
</style>
