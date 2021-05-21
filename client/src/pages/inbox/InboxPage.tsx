import React, { useState } from 'react'
import { FlexColumn } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import CreateTaskTextField from './CreateTaskTextField'
import TaskList from './TaskList'

const InboxPage = () => {
  const [isListDisabled, setIsListDisabled] = useState<boolean>(true)

  return (
    <FlexColumn alignCenter>
      <div>
        <CreateTaskTextField
          isListDisabled={isListDisabled}
          setIsListDisabled={setIsListDisabled}
        />
        <Space padding='1rem 0' />
        <TaskList
          isListDisabled={isListDisabled}
          setIsListDisabled={setIsListDisabled}
        />
      </div>
    </FlexColumn>
  )
}

export default InboxPage
