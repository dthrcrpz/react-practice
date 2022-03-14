import { useState, useContext } from "react"
import { TodosContext } from "../context/TodosContext"
import TodoFilters from "./TodoFilters"
import TodoItemsRemaining from "./TodoItemsRemaining"

function TodoList() {
  const [filter, setFilter] = useState('all')
  const { todos, setTodos } = useContext(TodosContext)

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

  function toggleTodo(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id == id) {
        todo.isComplete = !todo.isComplete
      }

      return todo
    })

    setTodos(updatedTodos)
  }

  function deleteTodo(id) {
    console.log(`deleting todo ${id}`)
    setTodos([...todos].filter(todo => todo.id != id))
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

  return (
    <>
      <ul>
        {todosFiltered(filter).map((todo, key) => (
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
      <button onClick={() => completeAllTodos()}>Complete all todos</button>
      <button onClick={() => deleteCompleted()}>Delete completed tasks</button>

      <TodoItemsRemaining remaining={remaining}/>
      <TodoFilters
        filter={filter}
        setFilter={setFilter}
      />
    </>
  )
}

export default TodoList