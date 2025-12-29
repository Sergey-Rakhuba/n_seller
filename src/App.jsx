import { useState } from 'react'
import Lending from './assets/components/lending/lending.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Lending />
       
    </>
  )
}

export default App
