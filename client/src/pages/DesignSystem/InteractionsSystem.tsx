import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import React, { useState } from 'react'
import Button from 'src/components/Button'
import Snackbar from 'src/components/Snackbar'
import styled from 'styled-components'

const InteractionsSystem = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Container>
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
      <Button onClick={() => setIsOpen(true)}>Open snackbar</Button>
      <Snackbar
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        message='Test snackbar'
      />
    </Container>
  )
}

const Container = styled.div`
  max-width: 600px;

  & > * {
    margin-bottom: 1rem;
  }
`

export default InteractionsSystem
