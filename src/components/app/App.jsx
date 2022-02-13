import { Footer } from 'components/footer'
import { Todos } from 'components/todos'
import { TodosProvider } from 'contexts/todos/todos'
import './App.css'

function App () {
  return (
    <>
      <div className="app w-11/12 md:w-8/12 lg:w-6/12 mx-auto text-center mt-[-7px]">
        <p className="app__title font-thin text-[100px]">todos</p>

        <TodosProvider>
          <Todos />
        </TodosProvider>

        <Footer />
      </div>
    </>
  )
}

export default App
