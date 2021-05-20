import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <StyledFooter>
      footer
    </StyledFooter>
  )
}

const StyledFooter = styled.div`
  width: 100%;
  border-top: 1px solid ${props => props.theme.border.default};
  padding: 1rem;
`

export default Footer
