import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const TodosContext = createContext()

export const TodosProvider = ({ children }) => {
  const initialState = (() => {
    const localSt = localStorage.getItem('todos')

    if (localSt) return JSON.parse(localSt)

    return []
  })()

  const [state, dispatch] = useState(initialState)

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  )
}

TodosProvider.propTypes = {
  children: PropTypes.element.isRequired
}
