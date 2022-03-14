function TodoFilters({ filter, setFilter }) {
  return (
    <div>
      <button onClick={() => setFilter(filter = 'all')}>All</button>
      <button onClick={() => setFilter(filter = 'active')}>Active</button>
      <button onClick={() => setFilter(filter = 'completed')}>Completed</button>
    </div>
  )
}

export default TodoFilters