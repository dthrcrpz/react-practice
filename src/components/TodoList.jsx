import propTypes from "prop-types"
import { useState } from "react"
import TodoFilters from "./TodoFilters"
import TodoItemsRemaining from "./TodoItemsRemaining"

TodoList.propTypes = {
  todos: propTypes.array.isRequired,
  toggleTodo: propTypes.func.isRequired,
  markAsEditing: propTypes.func.isRequired,
  updateTodo: propTypes.func.isRequired,
  deleteTodo: propTypes.func.isRequired,
  remaining: propTypes.func.isRequired,
  completeAllTodos: propTypes.func.isRequired,
  deleteCompleted: propTypes.func.isRequired,
  todosFiltered: propTypes.func.isRequired
}

function TodoList({ todos, toggleTodo, markAsEditing, updateTodo, deleteTodo, remaining, completeAllTodos, deleteCompleted, todosFiltered }) {
  const [filter, setFilter] = useState('all')

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