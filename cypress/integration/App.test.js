const { randText } = require('@ngneat/falso')
const { nanoid } = require('nanoid')

describe('Pruebas sobre la aplicación', () => {
  it('se puede abrir y cargar los datos del localstorage', () => {
    localStorage.setItem(
      'todos',
      JSON.stringify([{ id: nanoid(), isCompleted: false, value: randText() }])
    )

    cy.visit('/')

    cy.get('li[data-testid="todo-item"]').should('have.length', 1)
  })
})
