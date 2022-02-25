import CheckIcon from 'components/icons/CheckIcon'
import CloseIcon from 'components/icons/CloseIcon'
import useTodosContext from 'hooks/useTodosContext'
import propTypes from 'prop-types'
import { useState } from 'react'
import styles from 'styles/TodoItem.module.css'

const TodoItem = ({ id, value, isCompleted }) => {
  const { toggleCompleteTodo, deleteTodo, modifyTodo } = useTodosContext()
  const [inputValue, setInputValue] = useState(value)
  const [isEditing, setIsEditing] = useState(false)

  function handleExitOfInput () {
    modifyTodo({ id, value: inputValue })
    setIsEditing(false)
  }

  function handleEnter (evt) {
    if (evt.key === 'Enter') handleExitOfInput()
  }

  const completeTodoStyles = isCompleted
    ? 'text-[#d9d9d9] line-through focus:text-[#4d4d4d] focus:no-underline'
    : 'text-[#4d4d4d]'

  return (
    <li
      data-testid="todo-item"
      className={`${styles.todo} pl-3 flex items-center justify-between gap-2`}
    >
      <button
        type="button"
        role="button"
        className={`border ${
          isCompleted ? 'border-[#77bfaf]' : 'border-[#ededed]'
        } rounded-full flex items-center justify-center w-8 h-8 min-w-[32px] min-h-[26px]`}
        onClick={() => toggleCompleteTodo(id)}
      >
        {isCompleted && <CheckIcon />}
      </button>

      {isEditing && (
        <input
          type="text"
          id={id}
          className="text-[24px] text-left flex-1 py-3 outline-none px-3 w-full focus:border focus:border-[#999] font-light"
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
          onKeyPress={(evt) => handleEnter(evt)}
          onBlur={() => handleExitOfInput()}
          autoFocus
        />
      )}

      {!isEditing && (
        <label
          className={`text-[24px] text-left flex-1 py-3 outline-none px-3 ${completeTodoStyles} w-full`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {value}
        </label>
      )}

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
