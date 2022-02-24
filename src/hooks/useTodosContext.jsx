import { TodosContext } from 'contexts/todos/todos'
import { nanoid } from 'nanoid'
import { useContext } from 'react'
import { saveTodos } from 'services/todosService'

export default function useTodosContext () {
  const { state, dispatch } = useContext(TodosContext)

  function addTodo (payload) {
    const newTodo = { isCompleted: false, value: payload, id: nanoid() }
    const newState = [...state, newTodo]
    saveTodos(newState)
    dispatch(newState)
  }

  function modifyTodo (todo) {
    const newState = state.map(t => todo.id === t.id ? { ...t, ...todo } : t)
    saveTodos(newState)
    dispatch(newState)
  }

  function deleteTodo (payload) {
    const newState = state.filter(({ id }) => id !== payload)
    dispatch(newState)
  }

  function deleteCompletedTodos () {
    const newState = state.filter(({ isCompleted }) => !isCompleted)
    dispatch(newState)
  }

  function toggleCompleteTodo (payload) {
    const newState = state.map((todo) =>
      todo.id === payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )
    dispatch(newState)
  }

  function toggleSelectedTodos () {
    const isCompleted = !state.every(({ isCompleted }) => isCompleted)
    const newState = state.map((todo) => ({
      ...todo,
      isCompleted
    }))
    dispatch(newState)
  }

  return {
    addTodo,
    modifyTodo,
    deleteTodo,
    deleteCompletedTodos,
    toggleCompleteTodo,
    toggleSelectedTodos,
    state
  }
}
