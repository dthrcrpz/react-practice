import propTypes from "prop-types"

TodoList.propTypes = {
  todos: propTypes.array.isRequired,
  toggleTodo: propTypes.func.isRequired,
  markAsEditing: propTypes.func.isRequired,
  updateTodo: propTypes.func.isRequired,
  deleteTodo: propTypes.func.isRequired
}

function TodoList({ todos, toggleTodo, markAsEditing, updateTodo, deleteTodo }) {
  return (
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
  )
}

export default TodoList