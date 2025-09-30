import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from '../TodoItem.vue'

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
})