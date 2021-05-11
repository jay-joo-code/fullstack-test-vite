import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import React from 'react'
import { Link } from 'react-router-dom'
import theme from 'src/app/theme'
import styled from 'styled-components'
import Avatar from '../avatar'
import Icon from '../icon'
import { FlexRow, Space } from '../layout'

interface AuthedProps {
  userPhotoSrc: string
}

const Container = styled(FlexRow)`
  align-items: center;
  cursor: pointer;
`

const menu = () => (
  <Menu>
    <Menu.Item>
      <Link
        to='/new'
      >New plan</Link>
    </Menu.Item>
    <Menu.Item>
      <Link
        to='/logout'
        style={{ color: theme.danger }}
      >Logout</Link>
    </Menu.Item>
  </Menu>
)

const AuthedAvatar = ({ userPhotoSrc }: AuthedProps) => {
  return (
    <Dropdown
      overlay={menu()}
      trigger={['click']}
      arrow
    >
      <Container>
        <Avatar src={userPhotoSrc} />
        <Space margin='0 .1rem' />
        <Icon
          variant='down'
          size='1.5rem'
        />
      </Container>
    </Dropdown>
  )
}

export default AuthedAvatar
