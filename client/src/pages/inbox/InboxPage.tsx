import React from 'react'
import styled from 'styled-components'
import CreateTaskTextField from './CreateTaskTextField'
import TaskList from './TaskList'

const InboxPage = () => {
  return (
    <Container>
      <CreateTaskTextField />
      <TaskList />
    </Container>
  )
}

const Container = styled.div`
  
`

export default InboxPage
