import React, { useRef, useState, useEffect } from 'react'

import { useCreateTask } from 'src/api/task'
import TextField from 'src/components/form-elements/TextField'
import useKeyPress from 'src/hooks/useKeyPress'
import styled from 'styled-components'

interface CreateTaskTextFieldProps {
  onFocus: () => void
}

const CreateTaskTextField = ({ onFocus }: CreateTaskTextFieldProps) => {
  const { createTask } = useCreateTask()
  const [name, setName] = useState<string>('')
  const ref = useRef<HTMLInputElement>(null)

  const handleCreateTask = async () => {
    try {
      createTask({
        name,
      })
      setName('')
    } catch (error) {
      console.log('error.message.data :>> ', error.message.data)
    }
  }

  const escPressed = useKeyPress('Escape')

  useEffect(() => {
    if (escPressed) {
      ref.current?.focus()
    }
  }, [escPressed])

  return (
    <Container>
      <TextField
        ref={ref}
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        onEnterPress={handleCreateTask}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 400px;
`

export default CreateTaskTextField
