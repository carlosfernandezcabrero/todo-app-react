import { useContext } from 'react'
import { context as todosContext } from '../../contexts/todos/todos'
import { ButtonFilter } from '../button-filter/ButtonFilter'
import './TodosFooter.css'

export const TodosFooter = () => {
  const { state } = useContext(todosContext)

  const leftTodos = state.filter(todo => !todo.isCompleted)

  return (
    <div className="footer divide-y">
      <div className="grid grid-cols-3 py-3 px-5 font-thin text-[14px] text-[#777] bg-[#fff]">
        <div className="text-left">
          <p>{leftTodos.length} items left</p>
        </div>
        <div className="flex items-center gap-3">
          <ButtonFilter name="All" />
          <ButtonFilter name="Active" filterValue={false} />
          <ButtonFilter name="Completed" filterValue={true} />
        </div>
        <div></div>
      </div>
      <div className="w-[98%] h-1.5 bg-[#fff] mx-auto"></div>
      <div className="w-[96%] h-1.5 bg-[#fff] mx-auto"></div>
    </div>
  )
}
