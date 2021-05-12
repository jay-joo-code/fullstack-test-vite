import { default as MuiButton } from '@material-ui/core/Button'
import React from 'react'
import theme from 'src/app/theme'
import styled from 'styled-components'

type IVariant = 'contained' | 'text' | 'outlined'

interface ContainedBtnProps {
  children: React.ReactNode
  variant: IVariant
  color?: string
  bgColor?: string
}

const Button = (props: ContainedBtnProps) => {
  return (
    <StyledButton
      overrideColor={props.color || theme.brand}
      bgColor={props.bgColor}
      variant={props.variant}
    >{props.children}
    </StyledButton>
  )
}

interface StyledButtonProps {
  overrideColor: string
  bgColor?: string
  variant: IVariant
}

const StyledButton = styled(MuiButton)<StyledButtonProps>`
  /* contained */
  color: ${props => props.variant === 'contained' && 'white !important'};
  background: ${props => props.variant === 'contained' && `${props.overrideColor} !important`};

  /* text */
  color: ${props => props.variant === 'text' && `${props.overrideColor} !important`};
  background: ${props => props.variant === 'text' && 'white !important'};

  &:hover {
    background: ${props => props.variant === 'text' && `${props.bgColor} !important`};
  }

  /* outlined */
  color: ${props => props.variant === 'outlined' && `${props.overrideColor} !important`};
  background: ${props => props.variant === 'outlined' && 'white !important'};
  border-color: ${props => props.variant === 'outlined' && `${props.overrideColor} !important`};
`

export default Button
