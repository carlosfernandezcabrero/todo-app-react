import { randText } from '@ngneat/falso'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { nanoid } from 'nanoid'
import { afterEach, describe, expect, test, vi } from 'vitest'
import TodoItem from './TodoItem'

const inputValue = randText()
const id = nanoid()

const mockSet = vi.fn()
const mockDispatch = vi.fn()

vi.mock('react', async () => {
  const actual = await vi.importActual('react')

  return {
    ...actual,
    useContext: () => ({ dispatch: mockDispatch }),
    useState: () => [inputValue, mockSet]
  }
})

const renderComponent = (item) => render(<TodoItem {...item} />)

const defaultItem = (completed = false) => ({
  isCompleted: completed,
  id,
  value: inputValue
})

describe('Pruebas sobre el componente <TodoItem/>', () => {
  afterEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  test('debe renderizar se correctamente el valor del input', () => {
    const component = renderComponent(defaultItem())
    component.getByDisplayValue(inputValue)
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
      payload: id,
      type: 'toggleComplete'
    })
  })

  test.concurrent('debe lanzar la acción de borrar un Todo', () => {
    const item = defaultItem(true)
    const component = renderComponent(item)

    fireEvent.click(component.getByLabelText('delete'))

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: id,
      type: 'delete'
    })
  })

  test('no se debe lanzar ninguna acción cuando se hace un click sobre el input', () => {
    renderComponent(defaultItem())

    const inputElement = document.getElementById(id)
    inputElement.focus = vi.fn()

    const isDone = fireEvent.mouseDown(inputElement)

    expect(inputElement.focus).not.toBeCalled()
    expect(isDone).toBeFalsy()
  })

  test.concurrent('el input debe obtener el foco cuando se hace click dos veces', () => {
    renderComponent(defaultItem())

    const inputElement = document.getElementById(id)
    inputElement.focus = vi.fn()

    const isDone = fireEvent.dblClick(inputElement)

    expect(inputElement.focus).toHaveBeenCalledTimes(1)
    expect(isDone).toBeTruthy()
  })

  test.concurrent('debe poner el cursor al final cuando se hace dos clic en el input', () => {
    renderComponent(defaultItem())

    const inputElement = document.getElementById(id)

    const isDone = fireEvent.dblClick(inputElement)

    expect(isDone).toBeTruthy()
    expect(inputElement.selectionStart).toBe(inputValue.length)
  })

  test('no debe llamar a preventDefault cuando el input ya tiene el foco', () => {
    renderComponent(defaultItem())

    const inputElement = document.getElementById(id)
    inputElement.focus()

    const isPrevented = fireEvent.mouseDown(inputElement)

    expect(isPrevented).toBeTruthy()
  })
})
