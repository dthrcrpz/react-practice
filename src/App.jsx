import { useState } from 'react'

import logo from './logo.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Go out', isComplete: true },
    { id: 2, title: 'Walk dog', isComplete: false },
    { id: 3, title: 'Eat dinner', isComplete: false }
  ])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <ul>
          {todos.map((todo, key) => (
            <li key={key}>{ todo.title }</li>
          ))}
        </ul>
      </header>
    </div>
  )
}

export default App
