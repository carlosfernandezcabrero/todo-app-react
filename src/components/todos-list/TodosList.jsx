import { useContext } from 'react'
import { context as todosFilterContext } from '../../contexts/todos-filter/todosFilter'
import { context as todosContext } from '../../contexts/todos/todos'
import { TodoItem } from '../todo-item/TodoItem'
import { TodosFooter } from '../todos-footer/TodosFooter'
import './TodosList.css'

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
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
      {todosEmpty && <TodosFooter />}
    </>
  )
}
