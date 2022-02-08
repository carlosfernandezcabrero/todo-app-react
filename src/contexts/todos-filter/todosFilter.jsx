import propTypes from 'prop-types'
import { createContext, useState } from 'react'

export const context = createContext()

export const TodosFilterProvider = ({ children }) => {
  const [todosFilter, setTodosFilter] = useState(undefined)

  return (
    <context.Provider value={{ todosFilter, setTodosFilter }}>
      {children}
    </context.Provider>
  )
}

TodosFilterProvider.propTypes = {
  children: propTypes.element.isRequired
}
