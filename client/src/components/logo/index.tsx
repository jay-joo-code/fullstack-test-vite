import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Text from '../fonts/Text'

const Logo = () => {
  return (
    <Link to='/'>
      <StyledLogo variant='h3'>bunjang</StyledLogo>
    </Link>
  )
}

const StyledLogo = styled(Text)`
  color: ${props => props.theme.brand};
`

export default Logo
