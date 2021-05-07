import React from 'react'
import { Link } from 'react-router-dom'
import logo from 'src/assets/svgs/logo.svg'
import styled from 'styled-components'

const Logo = () => {
  return (
    <Link to='/'>
      <StyledLogo src={logo} />
    </Link>
  )
}

const StyledLogo = styled.img`
  
`

export default Logo
