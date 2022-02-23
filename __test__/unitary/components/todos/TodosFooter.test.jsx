import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ButtonFilter } from 'components/ButtonFilter'
import { TodosFooter } from 'components/todos/TodosFooter'
import useTodosContext from 'hooks/useTodosContext'
import { vi } from 'vitest'

vi.mock('components/button-filter/ButtonFilter', () => ({
  ButtonFilter: vi.fn(() => <></>)
}))

vi.mock('hooks/useTodosContext', () => ({
  __esModule: true,
  default: vi.fn()
}))

const setup = () => render(<TodosFooter />)

describe('Pruebas sobre el componente <TodosFooter/>', () => {
  beforeEach(() => {
    ButtonFilter.mockClear()

    useTodosContext.mockReset()
  })

  test('debe mostrar correctamente los todos no completados', () => {
    useTodosContext.mockReturnValue({
      state: [
        { isCompleted: false },
        { isCompleted: true },
        { isCompleted: true }
      ]
    })

    setup()

    screen.getByText('1 items left')
  })

  test('debe eliminar todos los Todos completados', () => {
    const mockDeleteCompletedTodos = vi.fn()

    useTodosContext.mockReturnValue({
      state: [{ isCompleted: true }],
      deleteCompletedTodos: mockDeleteCompletedTodos
    })

    setup()

    userEvent.click(screen.getByRole('button'))

    expect(mockDeleteCompletedTodos).toBeCalledTimes(1)
  })

  test('no debe renderizar el botón de eliminar los completados cuando no hay ninguno sin completar', () => {
    useTodosContext.mockReturnValue({ state: [] })

    setup()

    expect(screen.queryByText('Clear Completed')).toBeNull()
  })
})
