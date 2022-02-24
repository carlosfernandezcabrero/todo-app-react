export function saveTodos (todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}
