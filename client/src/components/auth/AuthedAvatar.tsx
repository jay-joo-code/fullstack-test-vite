import React from 'react'
import styled from 'styled-components'
import Avatar from '../avatar'
import Icon from '../icon'
import { FlexRow, Space } from '../layout'

interface AuthedProps {
  userPhotoSrc: string
}

const AuthedAvatar = ({ userPhotoSrc }: AuthedProps) => {
  return (
    <Container>
      <Avatar src={userPhotoSrc} />
      <Space margin='0 .1rem' />
      <Icon
        variant='down'
        size='1.5rem'
      />
    </Container>
  )
}

const Container = styled(FlexRow)`
  align-items: center;
  cursor: pointer;
`

export default AuthedAvatar
