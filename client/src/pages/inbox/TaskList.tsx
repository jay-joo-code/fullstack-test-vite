import React from 'react'
import { useTasks } from 'src/api/task'
import TaskItem from 'src/components/TaskItem'
import styled from 'styled-components'

const TaskList = () => {
  const { tasks } = useTasks()

  return (
    <Container>
      {tasks?.map((task) => (
        <TaskItem
          key={task?._id}
          task={task}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  
`

export default TaskList
