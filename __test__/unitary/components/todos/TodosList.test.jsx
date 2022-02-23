import { render } from '@testing-library/react'
import TodoItem from 'components/todos/TodoItem'
import { TodosFooter } from 'components/todos/TodosFooter'
import { TodosList } from 'components/todos/TodosList'
import useTodosContext from 'hooks/useTodosContext'
import useTodosFilterContext from 'hooks/useTodosFilterContext'
import { nanoid } from 'nanoid'
import { vi } from 'vitest'

vi.mock('components/todos/TodoItem', () => ({
  __esModule: true,
  default: vi.fn(() => <></>)
}))

vi.mock('components/todos/TodosFooter', () => ({
  TodosFooter: vi.fn(() => <></>)
}))

vi.mock('hooks/useTodosContext', () => ({
  __esModule: true,
  default: vi.fn()
}))

vi.mock('hooks/useTodosFilterContext', () => ({
  __esModule: true,
  default: vi.fn()
}))

const setup = () => render(<TodosList />)

describe('Pruebas sobre el componente <TodoList/>', () => {
  beforeEach(() => {
    TodosFooter.mockClear()
    TodoItem.mockClear()

    useTodosContext.mockReset()
    useTodosFilterContext.mockReset()
  })

  test('debe renderizar tantos Todos como haya en el contexto', () => {
    useTodosContext.mockReturnValue({
      state: [{ id: nanoid() }, { id: nanoid() }]
    })
    useTodosFilterContext.mockReturnValue({ todosFilter: undefined })

    setup()

    expect(TodoItem).toBeCalledTimes(2)
  })

  test('debe renderizar el footer cuando hay Todos', () => {
    useTodosContext.mockReturnValue({
      state: [{ id: nanoid() }, { id: nanoid() }]
    })
    useTodosFilterContext.mockReturnValue({ todosFilter: undefined })

    setup()

    expect(TodosFooter).toHaveBeenCalledTimes(1)
  })

  test('no debe renderizar el footer cuando no hay Todos', () => {
    useTodosContext.mockReturnValue({
      state: []
    })
    useTodosFilterContext.mockReturnValue({ todosFilter: undefined })

    setup()

    expect(TodosFooter).toHaveBeenCalledTimes(0)
  })

  test('debe mostrar solo los completados', () => {
    useTodosContext.mockReturnValue({
      state: [
        { id: nanoid(), isCompleted: true },
        { id: nanoid(), isCompleted: false }
      ]
    })
    useTodosFilterContext.mockReturnValue({ todosFilter: true })

    setup()

    expect(TodoItem).toBeCalledTimes(1)
  })

  test('debe mostrar solo los no completados', () => {
    useTodosContext.mockReturnValue({
      state: [
        { id: nanoid(), isCompleted: true },
        { id: nanoid(), isCompleted: false }
      ]
    })
    useTodosFilterContext.mockReturnValue({ todosFilter: false })

    setup()

    expect(TodoItem).toBeCalledTimes(1)
  })
})
