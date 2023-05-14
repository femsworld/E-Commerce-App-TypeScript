import React from 'react'
import { useSelector } from 'react-redux'

const App = () => {
  const globalState = useSelector(state => state)
  console.log("globalSate: ", globalState)
  return (
      <div>
          App
      </div>
  )
}

export default App