import { ButtonFilter } from 'components/ButtonFilter'
import useTodosContext from 'hooks/useTodosContext'
import { useMemo } from 'react'
import 'styles/TodosFooter.css'

export const TodosFooter = () => {
  const { state, deleteCompletedTodos } = useTodosContext()

  const leftTodos = useMemo(
    () => state.filter((todo) => !todo.isCompleted),
    [state]
  )

  return (
    <div className="footer">
      <div className="grid grid-cols-3 py-3 px-5 text-[14px] text-[#777] bg-[#fff] font-light">
        <div className="text-left">
          <p>{leftTodos.length} items left</p>
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <ButtonFilter name="All" />
          <ButtonFilter name="Active" filterValue={false} />
          <ButtonFilter name="Completed" filterValue={true} />
        </div>
        <div className="text-right">
          {state.length > leftTodos.length && (
            <button
              onClick={() => deleteCompletedTodos()}
              className="font-light"
              role='button'
              type='button'
            >
              Clear Completed
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
