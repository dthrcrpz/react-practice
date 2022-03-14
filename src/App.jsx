import NoTodos from './components/NoTodos'
import TodoForm from './components/TodoForm'
import useToggle from './hooks/useToggle'
import useLocalStorage from './hooks/useLocalStorage'

import './App.css'
import TodoList from './components/TodoList'
import { useRef, useEffect } from 'react'
import { TodosContext } from './context/TodosContext'            

function App() {
  const [name, setName] = useLocalStorage('name', '')
  
  const nameInputEl = useRef(null)

  const [isFeatureOneVisbible, setFeatureOneVisibile] = useToggle(true)
  const [isFeatureTwoVisbible, setFeatureTwoVisibile] = useToggle(true)

  const [todos, setTodos] = useLocalStorage('todos', [])
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1)

  useEffect(() => {
    console.log('use effect running')
    nameInputEl.current.focus()

    return function cleanup() {
      // console.log('cleaning up');
    }
  }, [])

  function handleNameInput(event) {
    setName(event.target.value)
  }

  return (
    <TodosContext.Provider value={{ todos, setTodos, idForTodo, setIdForTodo }}>
      <div className="App">
        <form action="#">
          <input
            type="text"
            placeholder='What is your name?'
            value={name}
            ref={nameInputEl}
            onChange={handleNameInput}
          />
        </form>

        {name && 
          <p>Hello, { name }</p>
        }

        <button onClick={setFeatureOneVisibile}>Features One Toggle</button>
        <button onClick={setFeatureTwoVisibile}>Features Two Toggle</button>

        {isFeatureOneVisbible && (
          <TodoForm/>
        )}

        {isFeatureTwoVisbible && (
          <p>Feature two goes here bro</p>
        )}

        {todos.length > 0 ? (
          <TodoList/>
        ) : (
          <NoTodos/>
        )}
      </div>
    </TodosContext.Provider>
  )
}

export default App
