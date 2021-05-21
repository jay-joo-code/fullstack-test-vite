import React, { useRef, useState } from 'react'
import { useCreateTask } from 'src/api/task'
import TextField from 'src/components/form-elements/TextField'
import useKeyPress from 'src/hooks/useKeyPress'
import styled from 'styled-components'

interface CreateTaskTextFieldProps {
  isListDisabled: boolean
  setIsListDisabled: (value: boolean) => void
  focusIdx: number
  setFocusIdx: (value: number) => void
}

const CreateTaskTextField = ({ isListDisabled, setIsListDisabled, focusIdx, setFocusIdx }: CreateTaskTextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { createTask } = useCreateTask()
  const [name, setName] = useState<string>('')

  const handleCreateTask = async () => {
    try {
      if (document.activeElement === inputRef?.current) {
        createTask({
          name,
        })
        setName('')
      }
    } catch (error) {
      console.log('error.message.data :>> ', error.message.data)
    }
  }

  useKeyPress('Escape', () => {
    if (document.activeElement === inputRef?.current) {
      inputRef.current?.blur()
      setIsListDisabled(false)
    } else {
      inputRef.current?.focus()
      setIsListDisabled(true)
    }
  })

  useKeyPress('ArrowDown', () => {
    if (document.activeElement === inputRef?.current) {
      setFocusIdx(0)
      inputRef.current?.blur()
      setIsListDisabled(false)
    }
  })

  return (
    <Container>
      <TextField
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onEnterPress={handleCreateTask}
        fullWidth
        autoFocus
      />
    </Container>
  )
}

const Container = styled.div`
  width: 400px;
`

export default CreateTaskTextField
