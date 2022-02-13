import { CheckIcon } from 'components/icons/CheckIcon'
import { CloseIcon } from 'components/icons/CloseIcon'
import { context } from 'contexts/todos/todos'
import propTypes from 'prop-types'
import { useContext } from 'react'

export const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(context)

  function handleComplete (id) {
    dispatch({ type: 'toggleComplete', payload: id })
  }

  function handleDelete (id) {
    dispatch({ type: 'delete', payload: id })
  }

  return (
    <li className="todo pl-3 pr-4 py-3 flex items-center">
      <div className="todo__content flex-1 flex items-center justify-between gap-6 font-thin">
        <button
          type="button"
          role='checkbox'
          aria-label='complete'
          className="h-[30px] w-[30px] border border-[#77bfaf] rounded-full flex items-center justify-center"
          onClick={() => handleComplete(todo.id)}
        >
          {todo.isCompleted && <CheckIcon />}
        </button>
        <span
          className={`text-[24px] text-left flex-1 ${
            todo.isCompleted ? 'text-[#d9d9d9] line-through' : 'text-[#4d4d4d]'
          }`}
        >
          {todo.value}
        </span>
      </div>
      <button
        type="button"
        role='button'
        aria-label='delete'
        onClick={() => handleDelete(todo.id)}
        className="todo__close hidden w-6"
      >
        <CloseIcon />
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: propTypes.object.isRequired
}
