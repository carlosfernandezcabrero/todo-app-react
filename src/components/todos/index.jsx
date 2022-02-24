import { TodosFilterProvider } from 'contexts/todos-filter/todosFilter'
import { AddTodo } from './AddTodo'
import { TodosList } from './TodosList'

export const Todos = () => {
  return (
    <div className="todos border-b border-b-[#e6e6e6] mt-[-12px] divide-y divide-[#e6e6e6] font-light">
      <AddTodo />

      <TodosFilterProvider>
        <TodosList />
      </TodosFilterProvider>
    </div>
  )
}
