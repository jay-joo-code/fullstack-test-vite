import React, { useState } from 'react'
import { FlexColumn } from 'src/components/layout/Flex'
import Space from 'src/components/layout/Space'
import CreateTaskTextField from './CreateTaskTextField'
import TaskList from './TaskList'

const InboxPage = () => {
  const [isListDisabled, setIsListDisabled] = useState<boolean>(true)
  const [focusIdx, setFocusIdx] = useState<number>(0)

  return (
    <FlexColumn alignCenter>
      <div>
        <CreateTaskTextField
          isListDisabled={isListDisabled}
          setIsListDisabled={setIsListDisabled}
          focusIdx={focusIdx}
          setFocusIdx={setFocusIdx}
        />
        <Space padding='1rem 0' />
        <TaskList
          isListDisabled={isListDisabled}
          setIsListDisabled={setIsListDisabled}
          focusIdx={focusIdx}
          setFocusIdx={setFocusIdx}
        />
      </div>
    </FlexColumn>
  )
}

export default InboxPage
