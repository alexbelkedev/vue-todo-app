<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="$emit('toggle', todo.id)"
      />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </label>
    <button @click="$emit('remove', todo.id)">🗑️</button>
  </li>
</template>

<script setup>
defineProps(["todo"]);
defineEmits(["toggle", "remove"]);
</script>

<style scoped>
.done {
  text-decoration: line-through;
  color: gray;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
}
label {
  flex: 1;
}
button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
