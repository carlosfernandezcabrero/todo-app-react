import { TodosFooter } from 'components/todos/todos-footer/TodosFooter'
import { context as todosFilterContext } from 'contexts/todos-filter/todosFilter'
import { context as todosContext } from 'contexts/todos/todos'
import { useContext } from 'react'
import TodoItem from '../todo-item/TodoItem'

export const TodosList = () => {
  const { state } = useContext(todosContext)
  const { todosFilter } = useContext(todosFilterContext)

  const todosEmpty = Boolean(state.length)
  const todos =
    todosFilter === undefined
      ? state
      : state.filter(({ isCompleted }) => isCompleted === todosFilter)

  return (
    <>
      {todosEmpty && (
        <ul className="todos__items bg-[#fff] divide-y divide-[#ededed]">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      )}
      {todosEmpty && <TodosFooter />}
    </>
  )
}
