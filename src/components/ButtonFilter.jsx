import useTodosFilterContext from 'hooks/useTodosFilterContext'
import propTypes from 'prop-types'

export const ButtonFilter = ({ name, filterValue }) => {
  const { setTodosFilter, todosFilter } = useTodosFilterContext()

  const handleTodoFilter = () => setTodosFilter(filterValue)

  return (
    <button
      type="button"
      className={`px-2 font-light ${
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
