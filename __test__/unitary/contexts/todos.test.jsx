import { TodosProvider } from 'contexts/todos/todos'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { vi } from 'vitest'

vi.mock('react', async () => {
  const actual = await vi.importActual('react')

  return {
    ...actual,
    useState: vi.fn(() => [])
  }
})

describe('Pruebas sobre el contexto de Todos', () => {
  beforeEach(() => {
    useState.mockClear()
  })

  test('debe devolver por defecto un array vacío', () => {
    TodosProvider(<></>)

    expect(useState).toBeCalledWith([])
  })

  test('debe devolver los datos del localstorage cuando haya', () => {
    const expected = [{ id: nanoid() }]
    localStorage.setItem('todos', JSON.stringify(expected))

    TodosProvider(<></>)

    expect(useState).toBeCalledWith(expected)
  })
})
