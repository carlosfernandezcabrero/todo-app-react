import { AddTodo } from 'components/add-todo/AddTodo'
import { Footer } from 'components/Footer'
import { TodosList } from 'components/todos-list/TodosList'
import { TodosFilterProvider } from 'contexts/todos-filter/todosFilter'
import { TodosProvider } from 'contexts/todos/todos'
import './App.css'

function App () {
  return (
    <TodosProvider>
      <div className="app w-11/12 md:w-8/12 lg:w-6/12 mx-auto text-center mt-[-7px]">
        <p className="app__title font-thin text-[100px]">todos</p>
        <div className="todos border-b border-b-[#e6e6e6] mt-[-12px] divide-y divide-[#e6e6e6]">
          <AddTodo />
          <TodosFilterProvider>
            <TodosList />
          </TodosFilterProvider>
        </div>
        <Footer />
      </div>
    </TodosProvider>
  )
}

export default App
