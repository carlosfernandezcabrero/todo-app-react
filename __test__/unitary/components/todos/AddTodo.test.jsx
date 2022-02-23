import { randText } from '@ngneat/falso'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CaretDownIcon from 'components/icons/caret-down/CaretDownIcon'
import CaretDownSelectedIcon from 'components/icons/caret-down/CaretDownSelectedIcon'
import { AddTodo } from 'components/todos/AddTodo'
import useTodosContext from 'hooks/useTodosContext'
import { useState } from 'react'
import { vi } from 'vitest'

vi.mock('hooks/useTodosContext', () => ({
  __esModule: true,
  default: vi.fn()
}))

vi.mock('components/icons/caret-down/CaretDownIcon', () => ({
  __esModule: true,
  default: vi.fn(() => (<></>))
}))

vi.mock('components/icons/caret-down/CaretDownSelectedIcon', () => ({
  __esModule: true,
  default: vi.fn(() => (<></>))
}))

vi.mock('react', () => ({
  useState: vi.fn()
}))

const setup = () => render(<AddTodo />)

function setReturnValues (
  { state = '', dispatch = vi.fn() } = {},
  { todos = [], addTodo = vi.fn(), toggleSelectedTodos = vi.fn() } = {}
) {
  useState.mockReturnValue([state, dispatch])
  useTodosContext.mockReturnValue({ state: todos, addTodo, toggleSelectedTodos })
}

describe('Pruebas sobre el componente <AddTodo/>', () => {
  beforeEach(() => {
    cleanup()

    CaretDownIcon.mockClear()
    CaretDownSelectedIcon.mockClear()

    useState.mockReset()
    useTodosContext.mockReset()
  })

  test('debe no mostrar el caret cuando no hay Todos', () => {
    setReturnValues()

    setup()

    expect(CaretDownIcon).toBeCalledTimes(0)
    expect(CaretDownSelectedIcon).toBeCalledTimes(0)
  })

  test('debe mostrar el caret no seleccionado si alguno sin completar', () => {
    setReturnValues(undefined, { todos: [{ isCompleted: false }] })

    setup()

    expect(CaretDownIcon).toBeCalledTimes(1)
    expect(CaretDownSelectedIcon).toBeCalledTimes(0)
  })

  test('debe mostrar el caret seleccionado si todos están completados', () => {
    setReturnValues(undefined, { todos: [{ isCompleted: true }] })

    setup()

    expect(CaretDownIcon).toBeCalledTimes(0)
    expect(CaretDownSelectedIcon).toBeCalledTimes(1)
  })

  test('debe añadir un Todo cuando es valido y vaciar el valor del input', () => {
    const mockAddTodo = vi.fn()
    const mockSet = vi.fn()
    const value = randText()

    setReturnValues(
      { state: value, dispatch: mockSet },
      { addTodo: mockAddTodo }
    )

    setup()

    fireEvent.keyPress(screen.getByPlaceholderText('What needs to be done?'), {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    })

    expect(mockAddTodo).toBeCalledTimes(1)
    expect(mockSet).toBeCalledTimes(1)

    expect(mockAddTodo).toBeCalledWith(value)
    expect(mockSet).toBeCalledWith('')
  })

  test('no debe añadir un Todo cuando esta vacío', () => {
    const mockAddTodo = vi.fn()
    const mockSet = vi.fn()

    setReturnValues(
      { state: '      ', dispatch: mockSet },
      { addTodo: mockAddTodo }
    )

    setup()

    fireEvent.keyPress(screen.getByPlaceholderText('What needs to be done?'), {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    })

    expect(mockAddTodo).toBeCalledTimes(0)
    expect(mockSet).toBeCalledTimes(0)
  })

  test('debe completar o descompletar los Todos cuando se hace click ene l botón', () => {
    const mockToggleSelectedTodos = vi.fn()

    setReturnValues(undefined, {
      toggleSelectedTodos: mockToggleSelectedTodos
    })

    setup()

    userEvent.click(screen.getByRole('button'))

    expect(mockToggleSelectedTodos).toBeCalledTimes(1)
  })
})
