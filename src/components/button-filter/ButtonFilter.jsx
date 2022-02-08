import propTypes from 'prop-types'
import { useContext } from 'react'
import { context as todosFilterContext } from '../../contexts/todos-filter/todosFilter'

export const ButtonFilter = ({ name, filterValue }) => {
  const { todosFilter, setTodosFilter } = useContext(todosFilterContext)

  const handleTodoFilter = () => setTodosFilter(filterValue)

  return (
    <button
      type="button"
      className={`font-thin px-2 ${
        todosFilter === filterValue && 'border selected'
      }`}
      onClick={handleTodoFilter}
    >
      {name}
    </button>
  )
}

ButtonFilter.propTypes = {
  name: propTypes.string.isRequired,
  filterValue: propTypes.bool
}
