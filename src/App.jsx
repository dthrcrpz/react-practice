import { useState } from 'react'

import NoTodos from './components/NoTodos'
import TodoForm from './components/TodoForm'

import './App.css'
import TodoList from './components/TodoList'
import { useRef, useEffect } from 'react'

function App() {
  const [name, setName] = useState('')
  const nameInputEl = useRef(null)

  const [todos, setTodos] = useState([
    { id: 1, title: 'Go out', isComplete: true, isEditing: false },
    { id: 2, title: 'Walk dog', isComplete: false, isEditing: false },
    { id: 3, title: 'Eat dinner', isComplete: false, isEditing: false }
  ])

  const [idForTodo, setIdForTodo] = useState(4)

  function addTodo(todo) {
    setTodos([...todos, {
      id: idForTodo,
      title: todo,
      isComplete: false
    }])

    setIdForTodo(prevId => prevId + 1)
  }
  
  function deleteTodo(id) {
    console.log(`deleting todo ${id}`)
    setTodos([...todos].filter(todo => todo.id != id))
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

  function remaining() {
    return todos.filter(todo => !todo.isComplete).length
  }

  function completeAllTodos() {
    const updatedTodos = todos.map(todo => {
      todo.isComplete = true

      return todo
    })

    setTodos(updatedTodos)
  }

  function deleteCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete))
  }

  function todosFiltered(filter) {
    if (filter == 'all') {
      return todos
    } else if (filter == 'active') {
      return todos.filter(todo => !todo.isComplete)
    } else if (filter == 'completed') {
      return todos.filter(todo => todo.isComplete)
    }
  }

  useEffect(() => {
    console.log('use effect running')
    nameInputEl.current.focus()

    return function cleanup() {
      // console.log('cleaning up');
    }
  }, [])

  return (
    <div className="App">
      <form action="#">
        <input
          type="text"
          placeholder='What is your name?'
          value={name}
          ref={nameInputEl}
          onChange={event => setName(event.target.value)}
        />
      </form>

      {name && 
        <p>Hello, { name }</p>
      }

      <TodoForm addTodo={addTodo}/>

      {todos.length > 0 ? (
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          markAsEditing={markAsEditing}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          remaining={remaining}
          completeAllTodos={completeAllTodos}
          deleteCompleted={deleteCompleted}
          todosFiltered={todosFiltered}
        />
      ) : (
        <NoTodos/>
      )}
    </div>
  )
}

export default App
