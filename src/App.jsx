import { useState } from 'react'

import logo from './logo.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Go out', isComplete: true, isEditing: false },
    { id: 2, title: 'Walk dog', isComplete: false, isEditing: false },
    { id: 3, title: 'Eat dinner', isComplete: false, isEditing: false }
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

  function toggleTodo(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id == id) {
        todo.isComplete = !todo.isComplete
      }

      return todo
    })

    setTodos(updatedTodos)
  }
  
  function markAsEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id == id) {
        todo.isEditing = !todo.isEditing
      }

      return todo
    })

    setTodos(updatedTodos)
  }

  function updateTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id == id) {
        if (event.target.value.trim().length == 0) {
          todo.isEditing = false
          return todo
        }

        todo.title = event.target.value
        todo.isEditing = false
      }

      return todo
    })

    setTodos(updatedTodos)
  }

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input type="text" placeholder="Task" value={todoInput} onChange={handleInput}/>
        <button>Add</button>
      </form>

      <ul>
        {todos.map((todo, key) => (
          <li key={key} className={`todo ${todo.isComplete ? 'complete' : ''}`}>
            {!todo.isEditing ? (
              <div>
                <input type="checkbox" onChange={() => toggleTodo(todo.id)} checked={todo.isComplete ? true : false}/>
                <label onDoubleClick={() => markAsEditing(todo.id)}>{ todo.title }</label>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            ) : (
              <input
                autoFocus
                type="text"
                defaultValue={todo.title}
                onBlur={(event) => updateTodo(event, todo.id)}
                onKeyDown={(event) => {
                  if (event.key == 'Enter') {
                    updateTodo(event, todo.id)
                  } else if (event.key == 'Escape') {
                    markAsEditing(todo.id)
                  }
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
