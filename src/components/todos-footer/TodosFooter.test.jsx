import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { TodosFooter } from './TodosFooter'

const mockDispatch = vi.fn()
vi.mock('react', async () => ({
  ...(await vi.importActual('react')),
  useContext: () => ({
    state: [{ isCompleted: true }, { isCompleted: false }],
    dispatch: mockDispatch
  })
}))

function renderComponent () {
  return render(<TodosFooter/>)
}

describe('Pruebas sobre el componente <TodosFooter/>', () => {
  afterEach(() => {
    cleanup()
  })

  test('debe renderizar correctamente los Todos que faltan por completar', () => {
    const component = renderComponent()
    component.getByText('1 items left')
  })

  test('debe lanzar la acción "deleteCompleted" cuando se hace click en el botón "Clear Completed"', () => {
    const component = renderComponent()
    const button = component.getByLabelText('deleteCompleted')

    fireEvent.click(button)

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'deleteCompleted' })
  })
})
