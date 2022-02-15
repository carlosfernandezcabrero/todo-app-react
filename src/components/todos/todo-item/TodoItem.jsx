import { CheckIcon } from 'components/icons/CheckIcon'
import { CloseIcon } from 'components/icons/CloseIcon'
import { context } from 'contexts/todos/todos'
import propTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import './index.css'

const TodoItem = ({ id, value, isCompleted }) => {
  const { dispatch } = useContext(context)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    const inputElement = window.document.getElementById(id)

    inputElement.onmousedown = (evt) => {
      if (window.document.activeElement.id !== id) evt.preventDefault()
    }

    inputElement.ondblclick = () => {
      inputElement.focus()
      inputElement.selectionStart = 1000
    }
  }, [])

  const className = `text-[24px] text-left flex-1 font-thin px-4 py-3 outline-none ${
    isCompleted
      ? 'text-[#d9d9d9] line-through focus:text-[#4d4d4d] focus:no-underline'
      : 'text-[#4d4d4d]'
  }`

  const handleDelete = (id) => dispatch({ type: 'delete', payload: id })

  const handleComplete = (id) =>
    dispatch({ type: 'toggleComplete', payload: id })

  return (
    <li className="todo pl-3 flex items-center justify-between gap-6 font-thin">
      <button
        type="button"
        role="checkbox"
        aria-label="complete"
        className="h-[30px] w-[30px] border border-[#77bfaf] rounded-full flex items-center justify-center"
        onClick={() => handleComplete(id)}
      >
        {isCompleted && <CheckIcon />}
      </button>

      <input
        type="text"
        className={`${className} editing focus:border focus:border-[#999]`}
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        id={id}
      ></input>

      <button
        id="delete-button"
        type="button"
        role="button"
        aria-label="delete"
        onClick={() => handleDelete(id)}
        className="todo__close hidden w-6 mr-3"
      >
        <CloseIcon />
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  id: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  isCompleted: propTypes.bool.isRequired
}

export default TodoItem
