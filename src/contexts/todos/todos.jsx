import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const TodosContext = createContext()

export const TodosProvider = ({ children }) => {
  const [state, dispatch] = useState([])

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  )
}

TodosProvider.propTypes = {
  children: PropTypes.element.isRequired
}
