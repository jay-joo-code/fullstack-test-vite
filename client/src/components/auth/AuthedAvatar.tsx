import React from 'react'
import styled from 'styled-components'
import Avatar from './Avatar'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'

interface AuthedProps {
  userPhotoSrc: string
}

const AuthedAvatar = ({ userPhotoSrc }: AuthedProps) => {
  return (
    <Container>
      <Avatar src={userPhotoSrc} />
      <Space margin='0 .1rem' />
    </Container>
  )
}

const Container = styled(FlexRow)`
  align-items: center;
  cursor: pointer;
`

export default AuthedAvatar
