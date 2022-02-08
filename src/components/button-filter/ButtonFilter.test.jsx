import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { ButtonFilter } from './ButtonFilter'

const mockSetTodosFilter = vi.fn()
vi.mock('react', async () => ({
  ...(await vi.importActual('react')),
  useContext: () => ({
    setTodosFilter: mockSetTodosFilter,
    todosFilter: true
  })
}))

function renderComponent (filterValue) {
  const buttonFilter = filterValue
    ? <ButtonFilter name='Click' filterValue={filterValue}/>
    : <ButtonFilter name='Click'/>

  return render(buttonFilter)
}

describe('Pruebas sobre el componente <ButtonFilter/>', () => {
  afterEach(() => {
    cleanup()
  })

  test('debe renderizar se correctamente', () => {
    const component = renderComponent()
    component.getByText('Click')
  })

  test('debe cambiar el filtro de los todos cuando es pulsado el botón con el valor que se le pasa en la propiedad filterValue', () => {
    renderComponent(true)
    fireEvent.click(document.getElementsByTagName('button')[0])
    expect(mockSetTodosFilter).toHaveBeenCalledTimes(1)
    expect(mockSetTodosFilter).toHaveBeenCalledWith(true)
  })

  test('debe marcar se como seleccionado cuando el valor en el context del todosFilter es igual al que se le pasa en el filterValue', () => {
    renderComponent(true)
    expect(document.getElementsByClassName('border selected').length).toBe(1)
  })

  test('debe no marcar se como seleccionado cuando el valor en el context del todosFilter no es igual al que se le pasa en el filterValue', () => {
    renderComponent(false)
    expect(document.getElementsByClassName('border selected').length).toBe(0)
  })
})
