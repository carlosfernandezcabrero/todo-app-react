import { randText } from '@ngneat/falso'
import { cleanup, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useTodosContext } from 'hooks/useTodosContext'
import { nanoid } from 'nanoid'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { TodosFooter } from './TodosFooter'

vi.mock('hooks/useTodosContext', () => ({
  useTodosContext: vi.fn()
}))

vi.mock('components/button-filter/ButtonFilter', () => ({
  ButtonFilter: () => <></>
}))

const renderComponent = () => render(<TodosFooter/>)

describe('Pruebas sobre el componente <TodosFooter/>', () => {
  afterEach(() => {
    cleanup()
  })

  test('debe renderizar correctamente los Todos que faltan por completar', () => {
    useTodosContext.mockReturnValue({
      state: [
        { id: nanoid(), value: randText(), isCompleted: true },
        { id: nanoid(), value: randText(), isCompleted: false }
      ]
    })

    const component = renderComponent()

    component.getByText('1 items left')
  })

  test('se deben borrar los Todos completados cuando se hace click en el botón "Clear Completed"', () => {
    const mockDeleteCompletedTodos = vi.fn()
    useTodosContext.mockReturnValue({
      state: [
        { id: nanoid(), value: randText(), isCompleted: true },
        { id: nanoid(), value: randText(), isCompleted: false }
      ],
      deleteCompletedTodos: mockDeleteCompletedTodos
    })

    const component = renderComponent()

    const button = component.getByLabelText('deleteCompleted')
    user.click(button)

    expect(mockDeleteCompletedTodos).toBeCalledTimes(1)
    expect(mockDeleteCompletedTodos).toBeCalledWith()
  })
})
