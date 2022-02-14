import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import TodoItem from './TodoItem'

const mockDispatch = vi.fn()
vi.mock('react', async () => ({
  ...(await vi.importActual('react')),
  useContext: () => ({
    dispatch: mockDispatch
  })
}))

const renderComponent = (item) => render(<TodoItem {...item} />)

const defaultItem = (completed = false) => ({
  isCompleted: completed,
  id: '1',
  value: 'Boba Fett'
})

describe('Pruebas sobre el componente <TodoItem/>', () => {
  afterEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  test.concurrent('debe renderizar se correctamente', () => {
    const item = defaultItem()
    const component = renderComponent(item)

    component.getByText(item.value)
  })

  test('debe renderizar correctamente cuando esta seleccionado el item', () => {
    renderComponent(defaultItem(true))
    expect(document.getElementsByTagName('svg').length).toBe(2)
  })

  test.concurrent('debe renderizar correctamente cuando no esta seleccionado el item', () => {
    renderComponent(defaultItem())
    expect(document.getElementsByTagName('svg').length).toBe(1)
  })

  test('debe lanzar la acción de completar un Todo', () => {
    const item = defaultItem(true)
    const component = renderComponent(item)

    fireEvent.click(component.getByLabelText('complete'))

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: item.id,
      type: 'toggleComplete'
    })
  })

  test.concurrent('debe lanzar la acción de borrar un Todo', () => {
    const item = defaultItem(true)
    const component = renderComponent(item)

    fireEvent.click(component.getByLabelText('delete'))

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: item.id,
      type: 'delete'
    })
  })
})
