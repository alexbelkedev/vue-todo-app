import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue integration test', () => {
    it('adds, edits, toggles and delete a todo', async () => {
        const wrapper = mount(App)

        // ✅ ADD
        const input = wrapper.find('[data-test="todo-input"]')
        await input.setValue('Learn Vue Testing')
        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.text()).toContain('Learn Vue Testing')

        // ✅ TOGGLE
        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.setValue(true)
        expect(checkbox.element.checked).toBe(true)

        // ✅ EDIT
        const editButton = wrapper.find('[data-test="edit"]')
        await editButton.trigger('click')

        const editInput = wrapper.find('[data-test="edit-input"]')
        await editInput.setValue('Learn Vue 3 Testing')
        await editInput.trigger('keyup.enter')
        expect(wrapper.text()).toContain('Learn Vue 3 Testing')
        expect(wrapper.text()).not.toContain('Learn Vue Testing')

        // ✅ DELETE
        const deleteButton = wrapper.find('[data-test="remove"]')
        await deleteButton.trigger('click')
        expect(wrapper.text()).not.toContain('Learn Vue 3 Testing') 
    })
})