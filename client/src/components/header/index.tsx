import React from 'react'
import styled from 'styled-components'
import Auth from '../auth'
import { FlexRow } from '../layout'
import DesktopContainer from '../layout/DesktopContainer'
import Logo from '../logo'

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
          {/* <Auth /> */}
        </FlexRow>
      </DesktopContainer>
    </Container>
  )
}

const Container = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border};
`

export default Header
