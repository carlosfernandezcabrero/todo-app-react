import { randText } from '@ngneat/falso'
import { render, screen } from '@testing-library/react'
import { TodosList } from 'components/todos/TodosList'
import useTodosContext from 'hooks/useTodosContext'
import useTodosFilterContext from 'hooks/useTodosFilterContext'
import { nanoid } from 'nanoid'
import { vi } from 'vitest'

vi.mock('hooks/useTodosContext', () => ({
  __esModule: true,
  default: vi.fn()
}))

vi.mock('hooks/useTodosFilterContext', () => ({
  __esModule: true,
  default: vi.fn()
}))

const setup = () => render(<TodosList />)

describe('Pruebas sobre el componente <TodoList />', () => {
  beforeEach(() => {
    useTodosContext.mockReset()
    useTodosFilterContext.mockReset()
  })

  test('debe renderizar la lista de Todos correctamente', () => {
    useTodosFilterContext.mockReturnValue({
      todosFilter: undefined
    })
    useTodosContext.mockReturnValue({
      state: [
        { id: nanoid(), value: randText(), isCompleted: false },
        { id: nanoid(), value: randText(), isCompleted: false }
      ]
    })

    setup()

    expect(screen.getAllByTestId('todo-item').length).toBe(2)
  })
})
