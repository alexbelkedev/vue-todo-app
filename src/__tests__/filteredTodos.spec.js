import { describe, it, expect } from 'vitest'
import { ref, computed } from 'vue'
import { useFilteredTodos } from '../composables/useFilteredTodos'

describe('filteredTodos', () => {
  const todos = ref([
    { id: 1, text: 'Buy milk', done: false },
    { id: 2, text: 'Wash car', done: true },
    { id: 3, text: 'Read book', done: false }
  ])

  const filter = ref('all')
  const searchQuery = ref('')

  const filteredTodos = useFilteredTodos(todos, filter, searchQuery)

  it('returns all todos when filter is "all" and search is empty', () => {
    filter.value = 'all'
    searchQuery.value = ''
    expect(filteredTodos.value.length).toBe(3)
  })

  it('returns only active todos', () => {
    filter.value = 'active'
    searchQuery.value = ''
    expect(filteredTodos.value).toEqual([
      { id: 1, text: 'Buy milk', done: false },
      { id: 3, text: 'Read book', done: false }
    ])
  })

  it('returns only completed todos', () => {
    filter.value = 'completed'
    searchQuery.value = ''
    expect(filteredTodos.value).toEqual([
      { id: 2, text: 'Wash car', done: true }
    ])
  })

  it('filters todos by search query (case-insensitive)', () => {
    filter.value = 'all'
    searchQuery.value = 'book'
    expect(filteredTodos.value).toEqual([
      { id: 3, text: 'Read book', done: false }
    ])
  })
})