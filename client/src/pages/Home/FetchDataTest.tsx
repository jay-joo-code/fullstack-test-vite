import React from 'react'
import { usePing } from 'src/api/ping'
import styled from 'styled-components'

const FetchDataTest = () => {
  const { data } = usePing()

  return (
    <Container>
      server ping: {data}
    </Container>
  )
}

const Container = styled.div`
  
`

export default FetchDataTest
