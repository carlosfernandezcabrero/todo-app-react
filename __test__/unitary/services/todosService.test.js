import { randText } from '@ngneat/falso'
import { saveTodos } from 'services/todosService'

describe('Pruebas sobre el servicio de Todos', () => {
  test('debe guardar los Todos', () => {
    const expected = [{ todo: randText() }]

    saveTodos(expected)

    expect(JSON.parse(localStorage.getItem('todos'))).toStrictEqual(expected)
  })
})
