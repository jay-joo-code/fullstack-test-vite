import React from 'react'
import { ITask } from 'src/types/task.type'
import styled from 'styled-components'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import TaskDue from './TaskDue'
import TaskIsComplete from './TaskIsComplete'
import TaskName from './TaskName'
import TaskNotes from './TaskNotes'

interface TaskItemProps {
  task: ITask
  isSelected: boolean
  isFocused: boolean
  idx: number
  setIsListDisabled: (value: boolean) => void
}

const TaskItem = ({ task, isSelected, isFocused, idx, setIsListDisabled }: TaskItemProps) => {
  return (
    <Container
      isSelected={isSelected}
      isFocused={isFocused}
    >
      <FlexRow alignStart>
        <div>
          <Space padding='.2rem 0' />
          <TaskIsComplete
            task={task}
            isFocused={isFocused}
          />
        </div>
        <Space padding='0 .5rem' />
        <FullWidth>
          <TaskName
            isFocused={isFocused}
            task={task}
            setIsListDisabled={setIsListDisabled}
          />
          <TaskNotes
            isFocused={isFocused}
            task={task}
            setIsListDisabled={setIsListDisabled}
          />
          <TaskDue
            isFocused={isFocused}
            task={task}
            setIsListDisabled={setIsListDisabled}
          />
        </FullWidth>
      </FlexRow>
    </Container>
  )
}

interface ContainerProps {
  isSelected: boolean
  isFocused: boolean
}

const Container = styled.div<ContainerProps>`
  padding: .5rem;
  border-radius: 4px;

  // isSelected
  background: ${props => props.isSelected && props.theme.brand[100]};

  // isFocused
  background: ${props => props.isFocused && props.theme.brand[50]};
`

const FullWidth = styled.div`
  /* width: 100%; */
`

export default TaskItem
