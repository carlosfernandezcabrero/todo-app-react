import { randText } from '@ngneat/falso'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckIcon } from 'components/icons/CheckIcon'
import TodoItem from 'components/todos/TodoItem'
import useTodosContext from 'hooks/useTodosContext'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { vi } from 'vitest'

vi.mock('hooks/useTodosContext', () => ({
  __esModule: true,
  default: vi.fn()
}))

vi.mock('components/icons/CloseIcon', () => ({ CloseIcon: vi.fn(() => <></>) }))

vi.mock('components/icons/CheckIcon', () => ({ CheckIcon: vi.fn(() => <></>) }))

vi.mock('react', () => ({
  useState: vi.fn()
}))

const id = nanoid()
const value = randText()

const setup = (isCompleted) =>
  render(<TodoItem id={id} value={value} isCompleted={isCompleted} />)

function setReturnValues (
  { state = '', dispatch = vi.fn() } = {},
  { toggleCompleteTodo = vi.fn(), deleteTodo = vi.fn() } = {}
) {
  useState.mockReturnValue([state, dispatch])
  useTodosContext.mockReturnValue({
    toggleCompleteTodo,
    deleteTodo
  })
}

describe('Pruebas sobre el componente <TodoItem/>', () => {
  beforeEach(() => {
    CheckIcon.mockClear()

    useTodosContext.mockReset()
    useState.mockReset()
  })

  test('debe completar o descompletar el Todo al hacer click en el botón', () => {
    const mockToggleCompleteTodo = vi.fn()

    setReturnValues(undefined, { toggleCompleteTodo: mockToggleCompleteTodo })

    setup(false)

    userEvent.click(screen.getAllByRole('button')[0])

    expect(mockToggleCompleteTodo).toBeCalledTimes(1)
    expect(mockToggleCompleteTodo).toBeCalledWith(id)
  })

  test('debe eliminar el Todo al hacer click en el botón', () => {
    const mockDeleteTodo = vi.fn()

    setReturnValues(undefined, { deleteTodo: mockDeleteTodo })

    setup(false)

    userEvent.click(screen.getAllByRole('button')[1])

    expect(mockDeleteTodo).toBeCalledTimes(1)
    expect(mockDeleteTodo).toBeCalledWith(id)
  })

  test('debe hacer se editable el input solo cuando se hace doble click sobre el', () => {
    setReturnValues()

    setup(false)

    const input = document.getElementById(id)
    input.focus = vi.fn()

    fireEvent.mouseUp(input, { detail: 1 })
    fireEvent.mouseUp(input, { detail: 2 })

    expect(input.focus).toHaveBeenCalledTimes(1)
  })

  test('debe mover se el cursor al final del valor del input cuando se hace doble click sobre el', () => {
    setReturnValues({ state: value })

    setup(false)

    const input = document.getElementById(id)
    input.focus = vi.fn()

    fireEvent.mouseUp(input, { detail: 2 })

    expect(input.selectionStart).toBe(value.length)
  })

  test('debe perder el foco cuando se hace click en otro Todo', () => {
    setReturnValues()

    setup(false)

    const input = document.getElementById(id)
    const idAux = nanoid()
    document.activeElement.id = idAux
    const inputAux = document.getElementById(idAux)
    inputAux.blur = vi.fn()

    fireEvent.mouseDown(input)

    expect(inputAux.blur).toBeCalledTimes(1)
  })

  test('debe aparecer el check si esta completado', () => {
    setReturnValues()

    setup(true)

    expect(CheckIcon).toBeCalledTimes(1)
  })

  test('no debe aparecer el check cuando no esta completado', () => {
    setReturnValues()

    setup(false)

    expect(CheckIcon).toBeCalledTimes(0)
  })

  test('debe aparecer tachado el valor del Todo cuando esta completado', () => {
    setReturnValues()

    setup(true)

    expect(document.getElementById(id)).toHaveClass('line-through')
  })

  test('debe no aparecer tachado el valor del Todo cuando no esta completado', () => {
    setReturnValues()

    setup(false)

    expect(document.getElementById(id)).not.toHaveClass('line-through')
  })
})
