import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FetchDataTest from './FetchDataTest'

const Home = () => {
  return (
    <Container>
      <div>
        <Link to='/form-test'>form test</Link>
      </div>
      <div>
        <Link to='/design-system'>design system</Link>
      </div>
      <FetchDataTest />
    </Container>
  )
}

const Container = styled.div`
  
`

export default Home
