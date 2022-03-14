import { useState } from 'react'
import propTypes from 'prop-types'

TodoForm.propTypes = {
  addTodo: propTypes.func
}

function TodoForm(props) {
  const [todoInput, setTodoInput] = useState('')

  function handleInput(event) {
    setTodoInput(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (todoInput.trim().length == 0) {
      return
    }

    props.addTodo(todoInput)

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