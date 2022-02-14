import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { actions, reducer, TodosProvider } from './todos'

describe('Pruebas sobre el contexto de los todos', () => {
  describe('Pruebas sobre las acciones', () => {
    test.concurrent('debe crear un nuevo todo', () => {
      const expected = 'abc'
      const actual = actions.add([], expected)
      expect(actual.length).toBe(1)
      expect(actual[0].value).toBe(expected)
    })

    test.concurrent('debe borrar un todo', () => {
      const actual = actions.delete([{ id: 1 }], 1)
      expect(actual.length).toBe(0)
    })

    test.concurrent('debe borrar todos los Todos completados', () => {
      const actual = actions.deleteCompleted([
        { isCompleted: true },
        { isCompleted: false }
      ])
      expect(actual.length).toBe(1)
    })

    test.concurrent('debe marcar como completado un todo', () => {
      const actual = actions.toggleComplete([{ id: 1, isCompleted: false }], 1)
      expect(actual.length).toBe(1)
      expect(actual[0].isCompleted).toBe(true)
    })

    test.concurrent('debe marcar como no completado un todo', () => {
      const actual = actions.toggleComplete([{ id: 1, isCompleted: true }], 1)
      expect(actual.length).toBe(1)
      expect(actual[0].isCompleted).toBe(false)
    })

    test.concurrent('debe marcar el campo "isCompleted" de todos los Todos a False cuando todos están completos', () => {
      const actual = actions.toggleSelected([
        { isCompleted: true },
        { isCompleted: true }
      ])
      expect(actual.length).toBe(2)
      expect(actual.every(({ isCompleted }) => !isCompleted)).toBe(true)
    })

    test.concurrent('debe marcar el campo "isCompleted" de todos los Todos a True cuando alguno o todos están incompletos ', () => {
      const actual = actions.toggleSelected([
        { isCompleted: true },
        { isCompleted: false }
      ])
      expect(actual.length).toBe(2)
      expect(actual.every(({ isCompleted }) => isCompleted)).toBe(true)
    })
  })

  describe('Pruebas sobre el reducer', () => {
    test.concurrent('debe retornar el mismo estado cuando el tipo de la acción no es valido', () => {
      const expected = []
      const actual = reducer(expected, { type: 'test' })
      expect(actual).toStrictEqual(expected)
    })

    test.concurrent('debe retornar un nuevo estado cuando el tipo de la acción es valido', () => {
      const actual = reducer([], { type: 'add', payload: 'abc' })
      expect(actual.length).toStrictEqual(1)
    })
  })

  describe('Pruebas sobre la función provider', () => {
    test.concurrent('debe renderizar el children correctamente dentro del provider', () => {
      const component = render(
        <TodosProvider>
          <div>Hola mundo</div>
        </TodosProvider>
      )
      component.getByText('Hola mundo')
    })
  })
})
