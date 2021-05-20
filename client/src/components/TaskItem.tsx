import React from 'react'
import { ITask } from 'src/types/task.type'
import styled from 'styled-components'

interface TaskItemProps {
  task: ITask
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Container>
      {task.name}
    </Container>
  )
}

const Container = styled.div`
  
`

export default TaskItem
