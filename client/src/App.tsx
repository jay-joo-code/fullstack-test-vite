import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import logo from './logo.svg'
import styled from 'styled-components'

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
      <Logo src={logo} />
      <p>{text} built static faster more speed</p>
    </div>
  )
}

const Logo = styled.img`
  height: 200px;
  width: 200px;
`

export default App
