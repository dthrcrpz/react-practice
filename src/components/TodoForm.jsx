import { useState, useContext } from 'react'
import { TodosContext } from '../context/TodosContext'

function TodoForm(props) {
  const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext)
  const [todoInput, setTodoInput] = useState('')

  function handleInput(event) {
    setTodoInput(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (todoInput.trim().length == 0) {
      return
    }

    setTodos([...todos, {
      id: idForTodo,
      title: todoInput,
      isComplete: false
    }])

    setIdForTodo(prevId => prevId + 1)

    setTodoInput('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Task" value={todoInput} onChange={handleInput}/>
      <button>Add</button>
    </form>
  )
}

export default TodoForm