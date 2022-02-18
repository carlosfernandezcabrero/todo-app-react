import { randText } from '@ngneat/falso'
import { cleanup, render } from '@testing-library/react'
import { useTodosContext } from 'hooks/useTodosContext'
import { nanoid } from 'nanoid'
import { useContext } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { TodosList } from './TodosList'

vi.mock('react', async () => {
  const actual = await vi.importActual('react')

  return {
    ...actual,
    useContext: vi.fn()
  }
})

vi.mock('hooks/useTodosContext', () => ({ useTodosContext: vi.fn() }))

const renderComponent = () => render(<TodosList />)

const defaultState = [
  { isCompleted: true, id: nanoid(), value: randText() },
  { isCompleted: true, id: nanoid(), value: randText() },
  { isCompleted: false, id: nanoid(), value: randText() }
]

describe('Pruebas sobre el componente <TodoList/>', () => {
  afterEach(() => {
    cleanup()
  })

  test('debe no mostrar nada cuando no hay todos', () => {
    useTodosContext.mockReturnValue({ state: [] })
    useContext.mockReturnValue({ todosFilter: undefined })

    const component = renderComponent()

    expect(component.container.outerHTML).toBe('<div></div>')
  })

  test('debe mostrar todos los Todos cuando el valor del todosFilter sea undefined', () => {
    useTodosContext.mockReturnValue({ state: defaultState })
    useContext.mockReturnValue({ todosFilter: undefined })

    renderComponent()

    expect(document.getElementsByTagName('li').length).toBe(3)
  })

  test('debe mostrar solo los Todos completados cuando el valor del todosFilter sea True', () => {
    useTodosContext.mockReturnValue({ state: defaultState })
    useContext.mockReturnValue({ todosFilter: true })

    renderComponent()

    expect(document.getElementsByTagName('li').length).toBe(2)
  })

  test('debe mostrar solo los Todos no completados cuando el valor del todosFilter sea False', () => {
    useTodosContext.mockReturnValue({ state: defaultState })
    useContext.mockReturnValue({ todosFilter: false })

    renderComponent()

    expect(document.getElementsByTagName('li').length).toBe(1)
  })
})
