import { useState } from 'react'
import './App.css'

const user = { name: 'John Doe', age: 30 }

function App() {
  const [time, setTime] = useState()
  const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 28 },
    { name: 'Charlie', age: 22 }
  ]

  const liElements = users.map(user => 
    <li>
      <label>{user.name}</label>
      <label>{user.age}</label>
    </li>
  )

  return (
    <>
    <div>
      <label>{time}</label>
    </div>
    <button onClick={() => setTime(Date.now())}>Show time</button>
    <div>
      <label>{user.name}</label>
      <label>{user.age}</label>
    </div>
    <ul>{liElements}</ul>
    </>
  )
}

export default App