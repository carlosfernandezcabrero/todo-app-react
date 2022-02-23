import { render, screen } from '@testing-library/react'
import { TodosFooter } from 'components/todos/TodosFooter'
import useTodosContext from 'hooks/useTodosContext'
import useTodosFilterContext from 'hooks/useTodosFilterContext'
import { vi } from 'vitest'

vi.mock('hooks/useTodosContext', () => ({
  __esModule: true,
  default: vi.fn()
}))

vi.mock('hooks/useTodosFilterContext', () => ({
  __esModule: true,
  default: vi.fn()
}))

const setup = () => render(<TodosFooter />)

describe('Prueba sobre el componente <TodosFooter/>', () => {
  beforeEach(() => {
    useTodosContext.mockReset()
    useTodosFilterContext.mockReset()
  })

  test('debe mostrar correctamente los tres botones', () => {
    useTodosContext.mockReturnValue({
      state: [],
      deleteCompletedTodos: vi.fn()
    })
    useTodosFilterContext.mockReturnValue({
      todosFilter: undefined,
      setTodosFilter: vi.fn()
    })

    setup()

    expect(screen.getAllByRole('button').length).toBe(3)
    screen.getByText('All')
    screen.getByText('Active')
    screen.getByText('Completed')
  })
})
