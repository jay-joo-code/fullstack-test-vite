import React from 'react'
import styled from 'styled-components'
import Auth from '../auth/Auth'
import { FlexRow } from '../layout/Flex'
import DesktopContainer from '../layout/DesktopContainer'
import Logo from '../Logo'

const Header = () => {
  return (
    <Container>
      <DesktopContainer>
        <FlexRow
          alignCenter
          justifySpaceBetween
          fullWidth
          style={{ padding: '.5rem' }}
        >
          {/* <Logo /> */}
          <div />
          <Auth />
        </FlexRow>
      </DesktopContainer>
    </Container>
  )
}

const Container = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border.default};
`

export default Header
