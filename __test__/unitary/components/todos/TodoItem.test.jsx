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
  } = {},
  { isEditing = false, setIsEditing = vi.fn() } = {}
) {
  useState
    .mockReturnValueOnce([state, dispatch])
    .mockReturnValueOnce([isEditing, setIsEditing])
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

  test('debe hacer se editable el input cuando se hace doble click sobre el', () => {
    const mockSetIsEditing = vi.fn()

    setReturnValues(
      undefined,
      undefined,
      { isEditing: false, setIsEditing: mockSetIsEditing }
    )

    setup()

    fireEvent.doubleClick(screen.getByText(value))

    expect(mockSetIsEditing).toHaveBeenCalledTimes(1)
    expect(mockSetIsEditing).toHaveBeenCalledWith(true)
  })

  test('debe modificar el Todo cuando se hace blur', () => {
    const mockModifyTodo = vi.fn()
    const mockSetIsEditing = vi.fn()

    setReturnValues(
      undefined,
      { modifyTodo: mockModifyTodo },
      { isEditing: true, setIsEditing: mockSetIsEditing }
    )
    setup()

    const input = document.getElementById(id)
    input.blur()

    expect(mockModifyTodo).toBeCalledTimes(1)
    expect(mockModifyTodo).toBeCalledWith({ id, value })

    expect(mockSetIsEditing).toHaveBeenCalledTimes(1)
    expect(mockSetIsEditing).toHaveBeenCalledWith(false)
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

    expect(screen.getByText(value)).toHaveClass('line-through')
  })

  test('debe no aparecer tachado el valor del Todo cuando no esta completado', () => {
    setReturnValues()

    setup()

    expect(screen.getByText(value)).not.toHaveClass('line-through')
  })

  test('debe modificar el Todo cuando se presiona el enter', () => {
    const mockModifyTodo = vi.fn()
    const mockSetIsEditing = vi.fn()

    setReturnValues(
      undefined,
      { modifyTodo: mockModifyTodo },
      { isEditing: true, setIsEditing: mockSetIsEditing }
    )
    setup()

    const input = document.getElementById(id)

    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    })

    expect(mockModifyTodo).toBeCalledTimes(1)
    expect(mockModifyTodo).toBeCalledWith({ id, value })

    expect(mockSetIsEditing).toBeCalledTimes(1)
    expect(mockSetIsEditing).toBeCalledWith(false)
  })
})
