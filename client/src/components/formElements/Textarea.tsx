import React, { forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import ResizedTextarea, { TextareaAutosizeProps } from 'react-textarea-autosize'
import ErrorMsg from 'src/components/fonts/ErrorMsg'
import Label from 'src/components/fonts/Label'
import styled from 'styled-components'

interface TextareaProps extends TextareaAutosizeProps {
  maxRows?: number
  minRows?: number
  label?: string
  error?: string
}

const Textarea = (props: TextareaProps) => {
  return (
    <div>
      <Label {...props}>{props.label}</Label>
      <div>
        <StyledTextarea
          {...props}
        />
      </div>
      <ErrorMsg error={props.error} />
    </div>
  )
}

interface HookedInputProps extends UseFormRegisterReturn {
  maxRows?: number
  minRows?: number
  label?: string
  error?: string
}

export const HookedTextarea = forwardRef<HTMLTextAreaElement, HookedInputProps>((props: HookedInputProps, ref) => {
  return (
    <div>
      <Label {...props}>{props.label}</Label>
      <div>
        <StyledTextarea
          {...props}
          ref={ref}
        />
      </div>
      <ErrorMsg error={props.error} />
    </div>
  )
})

HookedTextarea.displayName = 'HookedTextarea'

const StyledTextarea = styled(ResizedTextarea)<TextareaProps>`
  width: 100%;
  background: ${(props) => props.theme.bg};
  font-size: 1rem;
  font-family: inherit;
  border: 2px solid ${(props) => props.theme.borderDark};
  border-radius: 4px;
  line-height: 1.5;
  padding: 0.5rem;
  overflow-y: auto;
  transition: border 0.1s ease-in-out;
  -webkit-appearance: none;

  // disabled
  background: ${(props) => props.disabled && props.theme.bgWash};

  // error
  border-color: ${(props) => (props.error != null) && props.theme.danger};
  
  &:placeholder {
    color: ${(props) => props.theme.textPlaceholder};
  }
`

export default Textarea
