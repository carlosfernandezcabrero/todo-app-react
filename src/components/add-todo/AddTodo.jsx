import { CaretDownIcon } from 'components/icons/caret-down/CaretDownIcon'
import { CaretDownSelectedIcon } from 'components/icons/caret-down/CaretDownSelectedIcon'
import { context } from 'contexts/todos/todos'
import { useContext, useState } from 'react'
import './AddTodo.css'

export const AddTodo = () => {
  const { state, dispatch } = useContext(context)
  const todosEmpty = Boolean(state.length)
  const isAllCompleted = state.every(({ isCompleted }) => isCompleted)

  const [todo, setTodo] = useState('')

  function handleAddTodo (event) {
    if (event.key === 'Enter') {
      const { value } = event.target

      if (value.trim().length > 0) {
        dispatch({ type: 'add', payload: value })
        setTodo('')
      }
    }
  }

  function handleCompleteAll () {
    dispatch({ type: 'toggleSelected' })
  }

  return (
    <div className="todos-add text-2xl text-left py-4 px-3 bg-[#fff] flex items-center justify-center sm:flex-row flex-col-reverse gap-6 flex-wrap">
      <button
        type="button"
        className="w-8"
        onClick={handleCompleteAll}
        aria-label="selectAll"
      >
        {todosEmpty && !isAllCompleted && <CaretDownIcon />}
        {todosEmpty && isAllCompleted && <CaretDownSelectedIcon />}
      </button>
      <input
        type="text"
        name="iTodo"
        className="flex-1 todos-add__input text-[24px] placeholder:italic font-thin placeholder:text-[#e6e6e6] outline-none w-full placeholder:text-center sm:placeholder:text-left"
        placeholder="What needs to be done?"
        onKeyPress={handleAddTodo}
        onChange={({ target }) => setTodo(target.value)}
        value={todo}
      />
    </div>
  )
}
