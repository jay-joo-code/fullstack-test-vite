import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Home = () => {
  return (
    <Container>
      <Link to='/form-test'>form test</Link>
    </Container>
  )
}

const Container = styled.div`
  
`

export default Home
