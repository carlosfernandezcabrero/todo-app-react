import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react'

export const context = createContext()

export const actions = {
  add: (state, payload) => {
    const newTodo = { isCompleted: false, value: payload, id: nanoid() }
    const newState = [...state, newTodo]
    return newState
  },
  delete: (state, payload) => {
    const newState = state.filter(({ id }) => id !== payload)
    return newState
  },
  toggleComplete: (state, payload) => {
    const newState = state.map((todo) =>
      todo.id === payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )
    return newState
  },
  toggleSelected: (state, payload) => {
    const isCompleted = !state.every(({ isCompleted }) => isCompleted)
    const newState = state.map((todo) => ({
      ...todo,
      isCompleted
    }))
    return newState
  }
}

export function reducer (state, action) {
  const actionOption = actions[action.type]
  return actionOption ? actionOption(state, action.payload) : state
}

export const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [])

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  )
}

TodosProvider.propTypes = {
  children: PropTypes.element.isRequired
}
