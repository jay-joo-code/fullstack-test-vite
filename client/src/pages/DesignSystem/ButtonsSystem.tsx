import React from 'react'
import theme from 'src/app/theme'
import Button from 'src/components/buttons/Button'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import { IconButton } from '@material-ui/core'

const ButtonsSystem = () => {
  return (
    <div>
      <ButtonsContainer>
        <Button
          variant='contained'
        >test
        </Button>
        <Button
          variant='text'
        >test
        </Button>
        <Button
          variant='outlined'
        >test
        </Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <Button
          variant='contained'
          color={theme.info}
        >test
        </Button>
        <Button
          variant='text'
          color={theme.info}
          bgColor={theme.info50}
        >test
        </Button>
        <Button
          variant='outlined'
          color={theme.info}
        >test
        </Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <Button
          variant='contained'
          disabled
        >test
        </Button>
        <Button
          variant='text'
          disabled
        >test
        </Button>
        <Button
          variant='outlined'
          disabled
        >test
        </Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <Button
          variant='contained'
          size='small'
        >test
        </Button>
        <Button
          variant='contained'
          size='medium'
        >test
        </Button>
        <Button
          variant='contained'
          size='large'
        >test
        </Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <Button
          variant='contained'
          startIcon={<DeleteIcon />}
          color={theme.danger}
        >delete
        </Button>
        <Button
          variant='contained'
          startIcon={<SaveIcon />}
          color={theme.info}
        >save
        </Button>
      </ButtonsContainer>
      <ButtonsContainer>
        <DeleteIcon fontSize='small' />
        <DeleteIcon fontSize='large' />
        <DeleteIconContainer>
          <DeleteIcon fontSize='inherit' />
        </DeleteIconContainer>
      </ButtonsContainer>
      <ButtonsContainer>
        <IconButton>
          <StyledAddCircleIcon />
        </IconButton>
      </ButtonsContainer>
    </div>
  )
}

const ButtonsContainer = styled.div`
  & > * {
    margin: .5rem !important;
  }
`

const DeleteIconContainer = styled.div`
  display: inline-block;
  font-size: 60px;
`

const StyledAddCircleIcon = styled(AddCircleOutlineOutlinedIcon)`
  color: ${props => props.theme.brand};
`

export default ButtonsSystem
