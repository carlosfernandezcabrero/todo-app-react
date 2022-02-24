import { randText } from '@ngneat/falso'
import useTodosContext from 'hooks/useTodosContext'
import { nanoid } from 'nanoid'
import { useContext } from 'react'
import { saveTodos } from 'services/todosService'
import { vi } from 'vitest'

const mockDispatch = vi.fn()

vi.mock('react', async () => {
  const actual = await vi.importActual('react')

  return {
    ...actual,
    useContext: vi.fn()
  }
})

vi.mock('services/todosService', () => ({
  saveTodos: vi.fn()
}))

describe('Pruebas sobre el hook useTodosContext', () => {
  beforeEach(() => {
    mockDispatch.mockClear()

    useContext.mockReset()
  })

  test('debe crear un nuevo Todo', () => {
    useContext.mockReturnValue({ state: [], dispatch: mockDispatch })

    const value = randText()
    const expected = [
      {
        isCompleted: false,
        value,
        id: expect.any(String)
      }
    ]
    const { addTodo } = useTodosContext()

    addTodo(value)

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith(expected)

    expect(saveTodos).toBeCalledTimes(1)
    expect(saveTodos).toBeCalledWith(expected)
  })

  test('debe eliminar un Todo', () => {
    const id = nanoid()
    useContext.mockReturnValue({ state: [{ id }], dispatch: mockDispatch })

    const { deleteTodo } = useTodosContext()

    deleteTodo(id)

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([])
  })

  test('debe borrar todos los Todos completados', () => {
    useContext.mockReturnValue({
      state: [{ isCompleted: true }],
      dispatch: mockDispatch
    })

    const { deleteCompletedTodos } = useTodosContext()

    deleteCompletedTodos()

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([])
  })

  test('debe cambiar el estado de completacion del Todo al valor Booleano contratio', () => {
    const id = nanoid()
    useContext.mockReturnValue({
      state: [{ id, isCompleted: true }],
      dispatch: mockDispatch
    })

    const { toggleCompleteTodo } = useTodosContext()

    toggleCompleteTodo(id)

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([{ id, isCompleted: false }])
  })

  test('debe poner todos los Todos a completados cuando hay alguno sin completar', () => {
    useContext.mockReturnValue({
      state: [{ isCompleted: true }, { isCompleted: false }],
      dispatch: mockDispatch
    })

    const { toggleSelectedTodos } = useTodosContext()

    toggleSelectedTodos()

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([
      { isCompleted: true },
      { isCompleted: true }
    ])
  })

  test('debe poner todos los Todos a no completados cuando están todos completados', () => {
    useContext.mockReturnValue({
      state: [{ isCompleted: true }, { isCompleted: true }],
      dispatch: mockDispatch
    })

    const { toggleSelectedTodos } = useTodosContext()

    toggleSelectedTodos()

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([
      { isCompleted: false },
      { isCompleted: false }
    ])
  })
})
