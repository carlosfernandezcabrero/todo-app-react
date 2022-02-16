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

  test('no se debe lanzar ninguna acción cuando se hace un click sobre el texto', () => {
    renderComponent(defaultItem())

    const inputElement = document.getElementById(`${id}-input`)
    const textElement = document.getElementById(`${id}-text`)
    const deleteButton = window.document.getElementById(`${id}-delete-button`)
    inputElement.focus = vi.fn()

    const isDone = fireEvent.mouseUp(textElement)

    expect(inputElement.focus).not.toBeCalled()
    expect(isDone).toBeFalsy()
    expect(deleteButton.style.display).toBe('initial')
    expect(textElement.style.display).toBe('initial')
    expect(inputElement.style.display).toBe('none')
  })

  test.concurrent('el input debe obtener el foco cuando se hace click dos veces', () => {
    renderComponent(defaultItem())

    const inputElement = document.getElementById(`${id}-input`)
    const textElement = document.getElementById(`${id}-text`)
    const deleteButton = window.document.getElementById(`${id}-delete-button`)
    inputElement.focus = vi.fn()

    const isDone = fireEvent.dblClick(textElement)

    expect(inputElement.focus).toHaveBeenCalledTimes(1)
    expect(isDone).toBeTruthy()
    expect(textElement.style.display).toBe('none')
    expect(deleteButton.style.display).toBe('none')
    expect(inputElement.style.display).toBe('initial')
  })

  test.concurrent('debe poner el cursor al final cuando se hace dos clic en el texto', () => {
    renderComponent(defaultItem())

    const inputElement = document.getElementById(`${id}-input`)
    const textElement = document.getElementById(`${id}-text`)

    const isDone = fireEvent.dblClick(textElement)

    expect(isDone).toBeTruthy()
    expect(inputElement.selectionStart).toBe(inputValue.length)
  })

  test('no debe llamar a preventDefault cuando el input ya tiene el foco', () => {
    renderComponent(defaultItem())

    const inputElement = document.getElementById(`${id}-input`)
    inputElement.focus()

    const isDone = fireEvent.click(inputElement)

    expect(isDone).toBeTruthy()
  })

  test('debe tener los estilos normales el input del Todo tiene el foco', () => {
    renderComponent(defaultItem())
    expect(
      document.getElementsByClassName('focus:border focus:border-[#999]').length
    ).toBe(1)
  })
})
