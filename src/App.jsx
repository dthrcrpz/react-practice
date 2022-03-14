import { useState } from 'react'

import logo from './logo.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Go out', isComplete: true },
    { id: 2, title: 'Walk dog', isComplete: false },
    { id: 3, title: 'Eat dinner', isComplete: false }
  ])

  const [todoInput, setTodoInput] = useState('aaa')
  const [idForTodo, setIdForTodo] = useState(4)

  function addTodo(event) {
    event.preventDefault()

    if (todoInput.trim().length == 0) {
      return
    }

    setTodos([...todos, {
      id: idForTodo,
      title: todoInput,
      isComplete: false
    }])

    setTodoInput('')
    setIdForTodo(prevId => prevId + 1)
  }
  
  function deleteTodo(id) {
    console.log(`deleting todo ${id}`)
    setTodos([...todos].filter(todo => todo.id != id))
  }

  function handleInput(event) {
    setTodoInput(event.target.value)
  }


  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input type="text" placeholder="Task" value={todoInput} onChange={handleInput}/>
        <button>Add</button>
      </form>

      <ul>
        {todos.map((todo, key) => (
          <li key={key}>{ todo.title } <button onClick={() => deleteTodo(todo.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  )
}

export default App
