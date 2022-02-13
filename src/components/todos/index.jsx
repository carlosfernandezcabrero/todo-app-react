import { AddTodo } from 'components/add-todo/AddTodo'
import { TodosList } from 'components/todos-list/TodosList'
import { TodosFilterProvider } from 'contexts/todos-filter/todosFilter'

export const Todos = () => {
  return (
    <div className="todos border-b border-b-[#e6e6e6] mt-[-12px] divide-y divide-[#e6e6e6]">
      <AddTodo />
      <TodosFilterProvider>
        <TodosList />
      </TodosFilterProvider>
    </div>
  )
}
