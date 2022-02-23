import { randText } from '@ngneat/falso'

describe('Pruebas sobre los Todos', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('puede añadir varios Todos', () => {
    const values = [randText(), randText()]

    cy.addTodo(values[0])
    cy.addTodo(values[1])

    cy.get('li[data-testid="todo-item"]').as('todoItems')

    cy.get('@todoItems').should('have.length', 2)
    cy.get('@todoItems')
      .first()
      .children('input')
      .should('have.value', values[0])
    cy.get('@todoItems')
      .last()
      .children('input')
      .should('have.value', values[1])
  })

  it('puede borrar un Todo', () => {
    cy.addTodo(randText())

    cy.get('li[data-testid="todo-item"]').as('todoItems')

    cy.get('@todoItems').should('have.length', 1)

    cy.get('@todoItems').first().realHover()

    cy.get('@todoItems').first().children('button').last().click()

    cy.get('@todoItems').should('have.length', 0)
  })

  it('puede filtrar los Todos', () => {
    const todo1 = randText()
    const todo2 = randText()
    cy.addTodo(todo1)
    cy.addTodo(todo2)

    cy.get('li[data-testid="todo-item"]').as('todoItems')

    cy.get('@todoItems').first().children('button').first().click()

    cy.get('@todoItems').should('have.length', 2)

    cy.contains('Active').click()
    cy.get('@todoItems').should('have.length', 1)
    cy.get('@todoItems').first().children('input').should('have.value', todo2)

    cy.contains('Completed').click()
    cy.get('@todoItems').should('have.length', 1)
    cy.get('@todoItems').first().children('input').should('have.value', todo1)

    cy.contains('All').click()
    cy.get('@todoItems').should('have.length', 2)
    cy.get('@todoItems').first().children('input').should('have.value', todo1)
    cy.get('@todoItems').last().children('input').should('have.value', todo2)
  })

  it('puede completar y descompletar los Todos', () => {
    cy.addTodo(randText())

    cy.contains('1 items left').should('exist')
    cy.contains('Clear Completed').should('not.exist')

    cy.get('li[data-testid="todo-item"]').as('todoItems')

    cy.get('@todoItems').first().children('button').first().click()

    cy.contains('0 items left').should('exist')
    cy.contains('Clear Completed').should('exist')

    cy.get('@todoItems').first().children('button').first().click()

    cy.contains('1 items left').should('exist')
    cy.contains('Clear Completed').should('not.exist')
  })

  it('puede borrar todos los Todos completados', () => {
    const todoNotCompletedValue = randText()

    cy.addTodo(randText())
    cy.addTodo(todoNotCompletedValue)

    cy.get('li[data-testid="todo-item"]').as('todoItems')

    cy.get('@todoItems').should('have.length', 2)

    cy.get('@todoItems').first().children('button').first().click()
    cy.contains('Clear Completed').click()

    cy.get('@todoItems').should('have.length', 1)
    cy.get('@todoItems')
      .first()
      .children('input')
      .should('have.value', todoNotCompletedValue)
  })

  it('puede seleccionar y remover la selección de los Todos', () => {
    cy.addTodo(randText())
    cy.addTodo(randText())

    cy.get('li[data-testid="todo-item"]').as('todoItems')

    cy.get('@todoItems').first().children('button').first().click()

    cy.get('li[data-testid="todo-item"] input.line-through').should(
      'have.length',
      1
    )

    cy.get('.todos-add > button').click()

    cy.get('li[data-testid="todo-item"] input.line-through').should(
      'have.length',
      2
    )

    cy.get('.todos-add > button').click()

    cy.get('li[data-testid="todo-item"] input.line-through').should(
      'have.length',
      0
    )
  })

  it('puede editar los Todo', () => {
    cy.addTodo(randText())
    cy.addTodo(randText())

    cy.get('li[data-testid="todo-item"]').as('todoItems')

    const todo1fv = randText()
    cy.get('@todoItems').first().children('input').dblclick()
    cy.get('@todoItems').first().children('input').clear().type(todo1fv)

    const todo2fv = randText()
    cy.get('@todoItems').last().children('input').dblclick()
    cy.get('@todoItems').last().children('input').clear().type(todo2fv)

    cy.get('@todoItems').first().children('input').click()

    cy.get('@todoItems').first().children('input').should('have.value', todo1fv)
    cy.get('@todoItems').last().children('input').should('have.value', todo2fv)
  })
})
