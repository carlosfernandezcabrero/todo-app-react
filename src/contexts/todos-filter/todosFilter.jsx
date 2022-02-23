import propTypes from 'prop-types'
import { createContext, useState } from 'react'

export const TodosFilterContext = createContext()

export const TodosFilterProvider = ({ children }) => {
  const [todosFilter, setTodosFilter] = useState(undefined)

  return (
    <TodosFilterContext.Provider value={{ todosFilter, setTodosFilter }}>
      {children}
    </TodosFilterContext.Provider>
  )
}

TodosFilterProvider.propTypes = {
  children: propTypes.element.isRequired
}
