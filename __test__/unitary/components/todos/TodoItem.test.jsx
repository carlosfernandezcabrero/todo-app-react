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

const setup = (isCompleted = false) =>
  render(<TodoItem id={id} value={value} isCompleted={isCompleted} />)

function setReturnValues (
  { state = value, dispatch = vi.fn() } = {},
  {
    toggleCompleteTodo = vi.fn(),
    deleteTodo = vi.fn(),
    modifyTodo = vi.fn()
  } = {}
) {
  useState.mockReturnValue([state, dispatch])
  useTodosContext.mockReturnValue({
    toggleCompleteTodo,
    deleteTodo,
    modifyTodo
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

    setup()

    userEvent.click(screen.getAllByRole('button')[0])

    expect(mockToggleCompleteTodo).toBeCalledTimes(1)
    expect(mockToggleCompleteTodo).toBeCalledWith(id)
  })

  test('debe eliminar el Todo al hacer click en el botón', () => {
    const mockDeleteTodo = vi.fn()

    setReturnValues(undefined, { deleteTodo: mockDeleteTodo })

    setup()

    userEvent.click(screen.getAllByRole('button')[1])

    expect(mockDeleteTodo).toBeCalledTimes(1)
    expect(mockDeleteTodo).toBeCalledWith(id)
  })

  test('debe hacer se editable el input solo cuando se hace doble click sobre el', () => {
    setReturnValues()

    setup()

    const input = document.getElementById(id)
    input.focus = vi.fn()

    fireEvent.mouseUp(input, { detail: 1 })
    fireEvent.mouseUp(input, { detail: 2 })

    expect(input.focus).toHaveBeenCalledTimes(1)
  })

  test('debe mover se el cursor al final del valor del input cuando se hace doble click sobre el', () => {
    setReturnValues({ state: value })

    setup()

    const input = document.getElementById(id)
    input.focus = vi.fn()

    fireEvent.mouseUp(input, { detail: 2 })

    expect(input.selectionStart).toBe(value.length)
  })

  test('debe perder el foco cuando se hace click en otro Todo', () => {
    setReturnValues()

    setup()

    const input = document.getElementById(id)
    const idAux = nanoid()
    document.activeElement.id = idAux
    const inputAux = document.getElementById(idAux)
    inputAux.blur = vi.fn()

    fireEvent.mouseDown(input)

    expect(inputAux.blur).toBeCalledTimes(1)
  })

  test('debe modificar el Todo cuando se hace click en otro Todo', () => {
    const mockModifyTodo = vi.fn()

    setReturnValues(undefined, { modifyTodo: mockModifyTodo })
    setup()

    const input = document.getElementById(id)
    const idAux = nanoid()
    const valueAux = randText()

    document.activeElement.id = idAux
    document.activeElement.value = valueAux

    fireEvent.mouseDown(input)

    expect(mockModifyTodo).toBeCalledTimes(1)
    expect(mockModifyTodo).toBeCalledWith({ id: idAux, value: valueAux })
  })

  test('debe aparecer el check si esta completado', () => {
    setReturnValues()

    setup(true)

    expect(CheckIcon).toBeCalledTimes(1)
  })

  test('no debe aparecer el check cuando no esta completado', () => {
    setReturnValues()

    setup()

    expect(CheckIcon).toBeCalledTimes(0)
  })

  test('debe aparecer tachado el valor del Todo cuando esta completado', () => {
    setReturnValues()

    setup(true)

    expect(document.getElementById(id)).toHaveClass('line-through')
  })

  test('debe no aparecer tachado el valor del Todo cuando no esta completado', () => {
    setReturnValues()

    setup()

    expect(document.getElementById(id)).not.toHaveClass('line-through')
  })

  test('debe hacer blur cuando el input tiene el foco y se presiona el enter', () => {
    setReturnValues()
    setup()

    const input = document.getElementById(id)
    input.blur = vi.fn()

    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    })

    expect(input.blur).toBeCalledTimes(1)
  })

  test('debe modificar el Todo cuando se presiona el enter', () => {
    const mockModifyTodo = vi.fn()

    setReturnValues(undefined, { modifyTodo: mockModifyTodo })
    setup()

    const input = document.getElementById(id)

    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    })

    expect(mockModifyTodo).toBeCalledTimes(1)
    expect(mockModifyTodo).toBeCalledWith({ id, value })
  })
})
