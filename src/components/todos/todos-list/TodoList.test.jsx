import { cleanup, render } from '@testing-library/react'
import { useContext } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { TodosList } from './TodosList'

vi.mock('react', async () => ({
  ...(await vi.importActual('react')),
  useContext: vi.fn()
}))

const renderComponent = () => render(<TodosList />)

const defaultState = [
  { isCompleted: true, id: 1 },
  { isCompleted: true, id: 2 },
  { isCompleted: false, id: 3 }
]

describe('Pruebas sobre el componente <TodoList/>', () => {
  afterEach(() => {
    cleanup()
  })

  test('debe no mostrar nada cuando no hay todos', () => {
    useContext.mockReturnValue({
      state: []
    })
    const component = renderComponent()
    expect(component.container.outerHTML).toBe('<div></div>')
  })

  test('debe mostrar todos los Todos cuando el valor del todosFilter sea undefined', () => {
    useContext.mockReturnValue({
      state: defaultState,
      todosFilter: undefined
    })
    renderComponent()
    expect(document.getElementsByTagName('li').length).toBe(3)
  })

  test('debe mostrar solo los Todos completados cuando el valor del todosFilter sea True', () => {
    useContext.mockReturnValue({
      state: defaultState,
      todosFilter: true
    })
    renderComponent()
    expect(document.getElementsByTagName('li').length).toBe(2)
  })

  test('debe mostrar solo los Todos no completados cuando el valor del todosFilter sea False', () => {
    useContext.mockReturnValue({
      state: defaultState,
      todosFilter: false
    })
    renderComponent()
    expect(document.getElementsByTagName('li').length).toBe(1)
  })
})
