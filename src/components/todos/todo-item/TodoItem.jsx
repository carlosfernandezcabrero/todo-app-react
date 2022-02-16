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
    const inputElement = window.document.getElementById(`${id}-input`)
    const textElement = window.document.getElementById(`${id}-text`)
    const deleteButton = window.document.getElementById(`${id}-delete-button`)

    window.document.onmouseup = (evt) => {
      // si el input no tiene el foco se debe evitar el comportamiento por defecto
      if (window.document.activeElement.id !== `${id}-input`) {
        evt.preventDefault()

        inputElement.style.display = 'none'
        textElement.style.display = 'initial'
        deleteButton.style.display = 'initial'
      }
    }

    textElement.ondblclick = () => {
      inputElement.style.display = 'initial'

      inputElement.focus()
      inputElement.selectionStart = 1000

      textElement.style.display = 'none'
      deleteButton.style.display = 'none'
    }
  }, [])

  const completeTodoStyles = isCompleted
    ? 'text-[#d9d9d9] line-through focus:text-[#4d4d4d] focus:no-underline'
    : 'text-[#4d4d4d]'

  const handleDelete = (id) => dispatch({ type: 'delete', payload: id })

  const handleComplete = (id) =>
    dispatch({ type: 'toggleComplete', payload: id })

  return (
    <li className="todo pl-3 flex items-center justify-between sm:gap-2 font-thin">
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
        className="text-[24px] text-left flex-1 font-thin py-3 outline-none focus:border focus:border-[#999] hidden px-4"
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        id={`${id}-input`}
      ></input>

      <p
        id={`${id}-text`}
        className={`text-[24px] text-left flex-1 font-thin py-3 ${completeTodoStyles} px-4`}
      >
        {inputValue}
      </p>

      <button
        id={`${id}-delete-button`}
        type="button"
        role="button"
        aria-label="delete"
        onClick={() => handleDelete(id)}
        className="invisible w-6 mr-3"
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
