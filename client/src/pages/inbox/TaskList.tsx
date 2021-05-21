import React, { useState } from 'react'
import { useInboxTasks } from 'src/api/task'
import TaskItem from 'src/components/task-item/TaskItem'
import useKeyPress from 'src/hooks/useKeyPress'
import styled from 'styled-components'

interface TaskListProps {
  isListDisabled: boolean
  setIsListDisabled: (value: boolean) => void
}

const TaskList = ({ isListDisabled, setIsListDisabled }: TaskListProps) => {
  const { tasks } = useInboxTasks()

  // focus
  const [focusIdx, setFocusIdx] = useState<number>(0)
  useKeyPress('ArrowUp', () => {
    if (!isListDisabled) {
      setFocusIdx(Math.max(focusIdx - 1, 0))
    }
  })
  useKeyPress('ArrowDown', () => {
    if (!isListDisabled) {
      setFocusIdx(Math.min(focusIdx + 1, (tasks?.length || 1) - 1))
    }
  })

  // TODO: select

  return (
    <Container>
      {tasks?.map((task, idx) => (
        <TaskItem
          key={task?._id}
          task={task}
          idx={idx}
          isFocused={!isListDisabled && focusIdx === idx}
          isSelected={false}
          setIsListDisabled={setIsListDisabled}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  
`

export default TaskList
