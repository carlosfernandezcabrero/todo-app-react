import { randText } from '@ngneat/falso'
import { cleanup, fireEvent, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useTodosContext } from 'hooks/useTodosContext'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { AddTodo } from './AddTodo'

const mockSetTodo = vi.fn()

vi.mock('react', async () => {
  const actual = await vi.importActual('react')

  return {
    ...actual,
    useState: vi.fn()
  }
})

vi.mock('hooks/useTodosContext', () => ({ useTodosContext: vi.fn() }))

const renderComponent = () => render(<AddTodo />)

describe('Pruebas sobre el componente <AddTodo/>', () => {
  afterEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  test('debe llamar al método "toggleSelectedTodos" cuando se hace click en el caret', () => {
    const mockToggleSelectedTodos = vi.fn()
    useTodosContext.mockReturnValue({
      state: [{ id: nanoid(), isCompleted: true, value: randText() }],
      toggleSelectedTodos: mockToggleSelectedTodos
    })
    useState.mockReturnValue(['', mockSetTodo])

    const component = renderComponent()

    user.click(component.getByLabelText('selectAll'))

    expect(mockToggleSelectedTodos).toBeCalledTimes(1)
  })

  test('debe llamar mostrar el caret con el color "#e6e6e6" cuando no están todos los Todos completados', () => {
    useTodosContext.mockReturnValue({
      state: [{ id: nanoid(), isCompleted: false, value: randText() }]
    })
    useState.mockReturnValue(['', mockSetTodo])

    renderComponent()

    expect(document.getElementsByClassName('stroke-[#e6e6e6]').length).toBe(1)
  })

  test('debe llamar mostrar el caret con el color "#737373" cuando están todos los Todos completados', () => {
    useTodosContext.mockReturnValue({
      state: [{ id: nanoid(), isCompleted: true, value: randText() }]
    })
    useState.mockReturnValue(['', mockSetTodo])

    renderComponent()

    expect(document.getElementsByClassName('stroke-[#737373]').length).toBe(1)
  })

  test('no debe mostrar el caret cuando no hay Todos', () => {
    useTodosContext.mockReturnValue({
      state: []
    })
    useState.mockReturnValue(['', mockSetTodo])

    renderComponent()

    expect(document.getElementsByTagName('svg').length).toBe(0)
  })

  test('debe llamar al método "addTodo" cuando se presione la tecla enter en el input y este relleno', () => {
    const mockAddTodo = vi.fn()
    useTodosContext.mockReturnValue({
      state: [],
      addTodo: mockAddTodo
    })
    const value = randText()
    useState.mockReturnValue([value, mockSetTodo])

    const component = renderComponent([])

    const input = component.getByPlaceholderText('What needs to be done?')
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(mockAddTodo).toHaveBeenCalledTimes(1)
    expect(mockSetTodo).toHaveBeenCalledTimes(1)

    expect(mockAddTodo).toHaveBeenCalledWith(value)
    expect(mockSetTodo).toHaveBeenCalledWith('')
  })

  test('no debe llamar la acción "add" cuando se presione la tecla enter en el input y no este relleno', () => {
    const mockAddTodo = vi.fn()
    useTodosContext.mockReturnValue({
      state: [],
      addTodo: mockAddTodo
    })
    const value = ''
    useState.mockReturnValue([value, mockSetTodo])

    const component = renderComponent([])

    const input = component.getByPlaceholderText('What needs to be done?')
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(mockAddTodo).toHaveBeenCalledTimes(0)
    expect(mockSetTodo).toHaveBeenCalledTimes(0)
  })
})
