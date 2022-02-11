import { useContext, useState } from 'react'
import { context } from '../../contexts/todos/todos'
import { CaretDownIcon } from '../icons/caret-down/CaretDownIcon'
import { CaretDownSelectedIcon } from '../icons/caret-down/CaretDownSelectedIcon'
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
    <div className="todos-add text-2xl text-left py-4 px-3 bg-[#fff] flex items-center sm:gap-6 gap-1">
      <button
        type="button"
        className="sm:w-8 w-12"
        onClick={handleCompleteAll}
        aria-label="selectAll"
      >
        {todosEmpty && !isAllCompleted && <CaretDownIcon />}
        {todosEmpty && isAllCompleted && <CaretDownSelectedIcon />}
      </button>
      <input
        type="text"
        name="iTodo"
        className="flex-1 todos-add__input text-[24px] placeholder:italic font-thin placeholder:text-[#e6e6e6] outline-none"
        placeholder="What needs to be done?"
        onKeyPress={handleAddTodo}
        onChange={({ target }) => setTodo(target.value)}
        value={todo}
      />
    </div>
  )
}
