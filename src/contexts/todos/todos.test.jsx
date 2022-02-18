import { render } from '@testing-library/react'
import { describe, test } from 'vitest'
import { TodosProvider } from './todos'

describe('Pruebas sobre el contexto de los todos', () => {
  describe('Pruebas sobre la función provider', () => {
    test('debe renderizar el children correctamente dentro del provider', () => {
      const component = render(
        <TodosProvider>
          <div>Hola mundo</div>
        </TodosProvider>
      )
      component.getByText('Hola mundo')
    })
  })
})
