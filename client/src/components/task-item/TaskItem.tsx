import React from 'react'
import { ITask } from 'src/types/task.type'
import styled from 'styled-components'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'
import TaskIsComplete from './TaskIsComplete'
import TaskName from './TaskName'

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
      <FlexRow alignCenter>
        <TaskIsComplete
          task={task}
          isFocused={isFocused}
        />
        <Space padding='0 .5rem' />
        <TaskName
          isFocused={isFocused}
          task={task}
          setIsListDisabled={setIsListDisabled}
        />
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

export default TaskItem
