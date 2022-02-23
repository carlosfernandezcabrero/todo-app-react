import { CheckIcon } from 'components/icons/CheckIcon'
import { CloseIcon } from 'components/icons/CloseIcon'
import useTodosContext from 'hooks/useTodosContext'
import propTypes from 'prop-types'
import { useState } from 'react'
import styles from 'styles/TodoItem.module.css'

const TodoItem = ({ id, value, isCompleted }) => {
  const { toggleCompleteTodo, deleteTodo } = useTodosContext()
  const [inputValue, setInputValue] = useState(value)

  function handleMouseDown (evt) {
    // si no es un doble click y
    // el input no tiene el foco
    if (evt.detail !== 2 && document.activeElement.id !== id) {
      evt.preventDefault()
    }

    // si el elemento activo es distinto al componente
    if (document.activeElement.id && id !== document.activeElement.id) {
      const doc = document.getElementById(document.activeElement.id)
      doc.blur()
    }

    // si se ha pulsado dos veces
    if (evt.detail === 2) evt.preventDefault()
  }

  function handleMouseUp (evt) {
    // si se ha dado click dos veces
    if (evt.detail === 2) {
      const doc = document.getElementById(id)

      doc.focus()
      doc.selectionStart = 1_000
    }
  }

  const completeTodoStyles = isCompleted
    ? 'text-[#d9d9d9] line-through focus:text-[#4d4d4d] focus:no-underline'
    : 'text-[#4d4d4d]'

  return (
    <li
      data-testid="todo-item"
      className={`${styles.todo} pl-3 flex items-center justify-between sm:gap-2 font-thin`}
    >
      <button
        type="button"
        role="button"
        className={`border ${
          isCompleted ? 'border-[#77bfaf]' : 'border-[#ededed]'
        } rounded-full flex items-center justify-center w-8 h-8`}
        onClick={() => toggleCompleteTodo(id)}
      >
        {isCompleted && <CheckIcon />}
      </button>

      <input
        type="text"
        id={id}
        className={`text-[24px] text-left flex-1 font-thin py-3 outline-none focus:border focus:border-[#999] px-4 ${completeTodoStyles}`}
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        onMouseDown={(evt) => handleMouseDown(evt)}
        onMouseUp={(evt) => handleMouseUp(evt)}
      />

      <button
        type="button"
        role="button"
        onClick={() => deleteTodo(id)}
        className={`${styles.deleteButton} invisible w-6 mr-3`}
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
