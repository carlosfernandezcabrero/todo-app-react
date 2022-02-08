import { TodosFilterProvider } from '../../contexts/todos-filter/todosFilter'
import { TodosProvider } from '../../contexts/todos/todos'
import { AddTodo } from '../add-todo/AddTodo'
import { TodosList } from '../todos-list/TodosList'
import './App.css'

function App () {
  return (
    <TodosProvider>
      <div className="app w-8/12 mx-auto text-center mt-[-7px]">
        <p className="app__title font-thin text-[100px]">todos</p>
        <div className="todos mt-[-12px] divide-y divide-[#e6e6e6]">
          <AddTodo />
          <TodosFilterProvider>
            <TodosList />
          </TodosFilterProvider>
        </div>
      </div>
    </TodosProvider>
  )
}

export default App
