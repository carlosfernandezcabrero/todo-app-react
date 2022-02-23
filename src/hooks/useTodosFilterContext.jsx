import { TodosFilterContext } from 'contexts/todos-filter/todosFilter'
import { useContext } from 'react'

export default function useTodosFilterContext () {
  const { todosFilter, setTodosFilter } = useContext(TodosFilterContext)

  return { todosFilter, setTodosFilter }
}
