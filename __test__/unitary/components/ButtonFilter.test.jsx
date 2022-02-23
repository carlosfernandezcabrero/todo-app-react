import { randText } from '@ngneat/falso'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ButtonFilter } from 'components/ButtonFilter'
import useTodosFilterContext from 'hooks/useTodosFilterContext'
import { vi } from 'vitest'

vi.mock('hooks/useTodosFilterContext', () => ({
  __esModule: true,
  default: vi.fn()
}))

const name = randText()

const setup = (filterValue) =>
  render(<ButtonFilter name={name} filterValue={filterValue} />)

describe('prueba sobre el componente <ButtonFilter/>', () => {
  beforeEach(() => {
    useTodosFilterContext.mockReset()
  })

  test('debe setear el filtro cuando se hace click', () => {
    const mockSetTodosFilter = vi.fn()

    useTodosFilterContext.mockReturnValue({
      setTodosFilter: mockSetTodosFilter
    })

    setup(true)

    userEvent.click(screen.getByText(name))

    expect(mockSetTodosFilter).toBeCalledTimes(1)
    expect(mockSetTodosFilter).toBeCalledWith(true)
  })

  test('debe renderizar se como seleccionado cuando el filterValue que se le pasa en las props coincida con el del contexto', () => {
    useTodosFilterContext.mockReturnValue({ todosFilter: true })

    setup(true)

    expect(screen.getByText(name)).toHaveClass('border selected')
  })

  test('debe renderizar se como no seleccionado cuando el filterValue que se le pasa en las props no coincida con el del contexto', () => {
    useTodosFilterContext.mockReturnValue({ todosFilter: true })

    setup(false)

    expect(screen.getByText(name)).not.toHaveClass('border selected')
  })
})
