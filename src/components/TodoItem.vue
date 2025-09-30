<template>
  <li>
    <div v-if="!isEditing" class="view">
      <label>
        <input
          type="checkbox"
          :checked="todo.done"
          @change="$emit('toggle', todo.id)"
        />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
      </label>
      <div class="actions">
        <button @click="startEdit">✏️</button>
        <button @click="$emit('remove', todo.id)">🗑️</button>
      </div>
    </div>

    <div v-else class="edit">
      <input
        v-model="editText"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
      />
      <button @click="saveEdit">✅</button>
      <button @click="cancelEdit">❌</button>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["todo"]);
const emit = defineEmits(["toggle", "remove", "update"]);

const isEditing = ref(false);
const editText = ref("");

function startEdit() {
  editText.value = props.todo.text;
  isEditing.value = true;
}

function saveEdit() {
  if (editText.value.trim() === "") return;
  emit("update", { id: props.todo.id, text: editText.value.trim() });
  isEditing.value = false;
}

function cancelEdit() {
  isEditing.value = false;
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
  color: gray;
}
li {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  width: 100%;
}
.view {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
label {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.actions button {
  margin-left: 0.3rem;
}
.edit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
