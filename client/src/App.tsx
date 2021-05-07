import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [text, setText] = useState<string>('')

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/ping')
        setText(data)
      } catch (error) {

      }
    })()
  }, [])

  return (
    <div>
      <p>{text} built static faster more speed</p>
    </div>
  )
}

export default App
