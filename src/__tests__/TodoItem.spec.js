import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from '../components/TodoItem.vue'

const sampleTodo = {
  id: 1,
  text: 'Test Todo',
  done: false
}

describe('TodoItem.vue', () => {
  it('renders todo text', () => {
    const wrapper = mount(TodoItem, {
      props: { todo: sampleTodo }
    })
    expect(wrapper.text()).toContain('Test Todo')
  })

  it('emits toggle event on checkbox change', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: sampleTodo }
    })
    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(wrapper.emitted().toggle).toBeTruthy()
  })

  it('emits remove event on trash button click', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: sampleTodo }
    })
    const deleteButton = wrapper.find('[data-test="remove"]')
    await deleteButton.trigger('click')
    expect(wrapper.emitted().remove).toBeTruthy()
  })

  it('edits the selected todo', async () => {
  const wrapper = mount(TodoItem, {
    props: { todo: sampleTodo }
  })

  const editButton = wrapper.find('[data-test="edit"]')
  await editButton.trigger('click')

  const editInput = wrapper.find('[data-test="edit-input"]')
  expect(editInput.exists()).toBeTruthy()
  expect(editInput.element.value).toBe(sampleTodo.text)

  await editInput.setValue('Updated Todo')
  await editInput.trigger('keyup.enter')

  const updateEvents = wrapper.emitted().update
  expect(updateEvents).toBeTruthy()
  expect(updateEvents[0][0]).toEqual({ id: sampleTodo.id, text: 'Updated Todo' })
})
})