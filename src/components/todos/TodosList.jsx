import useTodosContext from 'hooks/useTodosContext'
import useTodosFilterContext from 'hooks/useTodosFilterContext'
import TodoItem from './TodoItem'
import { TodosFooter } from './TodosFooter'

export const TodosList = () => {
  const { state } = useTodosContext()
  const { todosFilter } = useTodosFilterContext()

  let todos = state
  if (todosFilter !== undefined) {
    todos = state.filter(({ isCompleted }) => isCompleted === todosFilter)
  }

  if (!state.length) return <></>

  return (
    <>
      <ul className="todos__items bg-[#fff] divide-y divide-[#ededed]">
        {todos.map(({ id, value, isCompleted }) => (
          <TodoItem key={id} id={id} value={value} isCompleted={isCompleted} />
        ))}
      </ul>

      <TodosFooter />
    </>
  )
}
