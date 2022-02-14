import { cleanup, fireEvent, render } from '@testing-library/react'
import { useContext, useState } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { AddTodo } from './AddTodo'

const mockDispatch = vi.fn()
const mockSetTodo = vi.fn()
vi.mock('react', async () => ({
  ...(await vi.importActual('react')),
  useContext: vi.fn(),
  useState: vi.fn()
}))

function renderComponent (state) {
  useContext.mockReturnValue({ state, dispatch: mockDispatch })
  return render(<AddTodo />)
}

describe('Pruebas sobre el componente <AddTodo/>', () => {
  afterEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  test.concurrent('debe llamar a la acción "toggleSelected" cuando se hace click en el caret', () => {
    useState.mockReturnValue(['', mockSetTodo])
    const component = renderComponent([])

    fireEvent.click(component.getByLabelText('selectAll'))

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'toggleSelected'
    })
  })

  test.concurrent('debe llamar mostrar el caret con el color "#e6e6e6" cuando no están todos los Todos completados', () => {
    useState.mockReturnValue(['', mockSetTodo])
    renderComponent([{ isCompleted: false, id: 1 }])
    expect(document.getElementsByClassName('stroke-[#e6e6e6]').length).toBe(1)
  })

  test.concurrent('debe llamar mostrar el caret con el color "#737373" cuando están todos los Todos completados', () => {
    useState.mockReturnValue(['', mockSetTodo])
    renderComponent([{ isCompleted: true, id: 1 }])
    expect(document.getElementsByClassName('stroke-[#737373]').length).toBe(1)
  })

  test('no debe mostrar el caret cuando no hay Todos', () => {
    useState.mockReturnValue(['', mockSetTodo])
    renderComponent([])
    expect(document.getElementsByTagName('svg').length).toBe(0)
  })

  test.concurrent('debe llamar la acción "add" cuando se presione la tecla enter en el input y este relleno', () => {
    useState.mockReturnValue(['abc', mockSetTodo])
    const component = renderComponent([])
    const input = component.getByPlaceholderText('What needs to be done?')

    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockSetTodo).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 'abc',
      type: 'add'
    })
    expect(mockSetTodo).toHaveBeenCalledWith('')
  })

  test('no debe llamar la acción "add" cuando se presione la tecla enter en el input y no este relleno', () => {
    useState.mockReturnValue(['', mockSetTodo])
    const component = renderComponent([])
    const input = component.getByPlaceholderText('What needs to be done?')

    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(mockDispatch).toHaveBeenCalledTimes(0)
    expect(mockSetTodo).toHaveBeenCalledTimes(0)
  })
})
