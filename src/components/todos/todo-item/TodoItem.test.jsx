import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { TodoItem } from './TodoItem'

const mockDispatch = vi.fn()
vi.mock('react', async () => ({
  ...(await vi.importActual('react')),
  useContext: () => ({
    dispatch: mockDispatch
  })
}))

const renderComponent = (item) => render(<TodoItem todo={item} />)

const defaultItem = (completed) => ({
  isCompleted: completed,
  id: 1,
  value: 'Boba Fett'
})

describe('Pruebas sobre el componente <TodoItem/>', () => {
  afterEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  test('debe renderizar correctamente cuando esta seleccionado el item', () => {
    const component = renderComponent(defaultItem(true))
    component.getByText('Boba Fett')
    expect(document.getElementsByTagName('svg').length).toBe(2)
  })

  test('debe renderizar correctamente cuando no esta seleccionado el item', () => {
    const component = renderComponent(defaultItem(false))
    component.getByText('Boba Fett')
    expect(document.getElementsByTagName('svg').length).toBe(1)
  })

  test('debe lanzar la acción de completar un Todo', () => {
    const component = renderComponent(defaultItem(true))
    fireEvent.click(component.getByLabelText('complete'))
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 1,
      type: 'toggleComplete'
    })
  })

  test('debe lanzar la acción de borrar un Todo', () => {
    const component = renderComponent(defaultItem(true))
    fireEvent.click(component.getByLabelText('delete'))
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 1,
      type: 'delete'
    })
  })
})
