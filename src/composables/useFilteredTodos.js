import { computed } from 'vue'

export function useFilteredTodos(todos, filter, searchQuery) {
  return computed(() => {
    const query = searchQuery.value.toLowerCase()
    return todos.value
      .filter(t => {
        if (filter.value === 'active') return !t.done
        if (filter.value === 'completed') return t.done
        return true
      })
      .filter(t => t.text.toLowerCase().includes(query))
  })
}