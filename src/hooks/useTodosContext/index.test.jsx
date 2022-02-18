import { randText } from '@ngneat/falso'
import { renderHook } from '@testing-library/react-hooks'
import { nanoid } from 'nanoid'
import { useContext } from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useTodosContext } from '.'

const mockDispatch = vi.fn()

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return { ...actual, useContext: vi.fn() }
})

describe('Pruebas sobre el hook useTodosContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('debe crear un nuevo todo', () => {
    useContext.mockReturnValue({ state: [], dispatch: mockDispatch })

    const value = randText()

    const { addTodo } = renderHook(() => useTodosContext()).result.current
    addTodo(value)

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([
      { id: expect.any(String), isCompleted: false, value }
    ])
  })

  test('debe borrar un todo', () => {
    const id = nanoid()
    useContext.mockReturnValue({ state: [{ id }], dispatch: mockDispatch })

    const { deleteTodo } = renderHook(() => useTodosContext()).result.current
    deleteTodo(id)

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([])
  })

  test('debe borrar todos los Todos completados', () => {
    useContext.mockReturnValue({
      state: [{ isCompleted: true }, { isCompleted: false }],
      dispatch: mockDispatch
    })

    const { deleteCompletedTodos } = renderHook(() => useTodosContext()).result
      .current
    deleteCompletedTodos()

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([{ isCompleted: false }])
  })

  test('debe marcar como completado un todo', () => {
    const id = nanoid()
    useContext.mockReturnValue({
      state: [{ id, isCompleted: false }],
      dispatch: mockDispatch
    })

    const { toggleCompleteTodo } = renderHook(() => useTodosContext()).result
      .current
    toggleCompleteTodo(id)

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([{ id, isCompleted: true }])
  })

  test('debe marcar como no completado un todo', () => {
    const id = nanoid()
    useContext.mockReturnValue({
      state: [{ id, isCompleted: true }],
      dispatch: mockDispatch
    })

    const { toggleCompleteTodo } = renderHook(() => useTodosContext()).result
      .current
    toggleCompleteTodo(id)

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([{ id, isCompleted: false }])
  })

  test('debe marcar el campo "isCompleted" de todos los Todos a False cuando todos están completos', () => {
    useContext.mockReturnValue({
      state: [{ isCompleted: true }, { isCompleted: true }],
      dispatch: mockDispatch
    })

    const { toggleSelectedTodos } = renderHook(() => useTodosContext()).result
      .current
    toggleSelectedTodos()

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([
      { isCompleted: false },
      { isCompleted: false }
    ])
  })

  test('debe marcar el campo "isCompleted" de todos los Todos a True cuando alguno o todos están incompletos ', () => {
    useContext.mockReturnValue({
      state: [{ isCompleted: true }, { isCompleted: false }],
      dispatch: mockDispatch
    })

    const { toggleSelectedTodos } = renderHook(() => useTodosContext()).result
      .current
    toggleSelectedTodos()

    expect(mockDispatch).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledWith([
      { isCompleted: true },
      { isCompleted: true }
    ])
  })
})
