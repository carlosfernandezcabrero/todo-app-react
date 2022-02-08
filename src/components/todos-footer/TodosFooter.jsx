import { useContext } from 'react'
import { context as todosContext } from '../../contexts/todos/todos'
import { ButtonFilter } from '../button-filter/ButtonFilter'
import './TodosFooter.css'

export const TodosFooter = () => {
  const { state, dispatch } = useContext(todosContext)

  const leftTodos = state.filter(todo => !todo.isCompleted)

  function handleDeleteCompleted () {
    dispatch({ type: 'deleteCompleted' })
  }

  return (
    <div className="footer">
      <div className="grid grid-cols-3 py-3 px-5 font-thin text-[14px] text-[#777] bg-[#fff]">
        <div className="text-left">
          <p>{leftTodos.length} items left</p>
        </div>
        <div className="flex items-center gap-3">
          <ButtonFilter name="All" />
          <ButtonFilter name="Active" filterValue={false} />
          <ButtonFilter name="Completed" filterValue={true} />
        </div>
        <div className="text-right">
          {state.length > leftTodos.length && (
            <button
              onClick={handleDeleteCompleted}
              className="font-thin"
              aria-label="deleteCompleted"
            >
              Clear Completed
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
