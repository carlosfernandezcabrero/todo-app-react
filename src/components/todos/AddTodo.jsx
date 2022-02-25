import CaretDownIcon from 'components/icons/caret-down/CaretDownIcon'
import CaretDownSelectedIcon from 'components/icons/caret-down/CaretDownSelectedIcon'
import useTodosContext from 'hooks/useTodosContext'
import { useMemo, useState } from 'react'
import 'styles/AddTodo.css'

export const AddTodo = () => {
  const { addTodo, toggleSelectedTodos, state } = useTodosContext()
  const [todo, setTodo] = useState('')

  const todosEmpty = Boolean(state.length)
  const isAllCompleted = useMemo(
    () => !state.some(({ isCompleted }) => !isCompleted),
    [state]
  )

  function handleAddTodo (event) {
    if (event.key === 'Enter') {
      const { value } = event.target

      if (value.trim().length > 0) {
        addTodo(value)
        setTodo('')
      }
    }
  }

  return (
    <div className="todos-add text-2xl text-left py-4 px-3 bg-[#fff] flex items-center justify-center sm:flex-row flex-col-reverse sm:gap-6 flex-wrap">
      <button
        role="button"
        type="button"
        className="w-8"
        onClick={() => toggleSelectedTodos()}
      >
        {todosEmpty && !isAllCompleted && <CaretDownIcon />}
        {todosEmpty && isAllCompleted && <CaretDownSelectedIcon />}
      </button>
      <input
        type="text"
        className="flex-1 todos-add__input text-[24px] font-light placeholder:italic placeholder:text-[#e6e6e6] outline-none w-full placeholder:text-center sm:placeholder:text-left"
        placeholder="What needs to be done?"
        onKeyPress={handleAddTodo}
        onChange={({ target }) => setTodo(target.value)}
        value={todo}
      />
    </div>
  )
}
