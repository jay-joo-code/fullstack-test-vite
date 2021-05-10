import React, { forwardRef } from 'react'
import Label from 'src/components/fonts/Label'
import ErrorMsg from 'src/components/fonts/ErrorMsg'
import styled from 'styled-components'
import ReactSelect, { CommonProps } from 'react-select'
import theme from 'src/app/theme'
import { Control, Controller } from 'react-hook-form'

interface IOption {
  label: string
  value: any
}

interface SelectProps {
  options: IOption[]
  value?: string
  onChange?: React.FormEventHandler<HTMLInputElement>
  label?: string
  disabled?: boolean
  maxMenuHeight?: number
}

const Select = forwardRef<HTMLInputElement, SelectProps>((props: SelectProps, ref) => {
  const valueObject = props.options.find(
    (option) => option.value === props.value
  )
  return (
    <div>
      <Label {...props}>{props.label}</Label>
      <StyledSelect
        ref={ref}
        isDisabled={props.disabled}
        theme={(defaultStyles: any) => ({
          ...defaultStyles,
          colors: {
            ...defaultStyles.colors,
            primary25: theme.brandLight,
            primary50: theme.bgWash2,
            primary: theme.brand,
          },
        })}
        {...props}
        value={valueObject}
        key={`select-key-${JSON.stringify(valueObject)}`}
        isSearchable={false}
      />
    </div>
  )
})

interface HookedSelectProps {
  name: string
  control: Control
  options: IOption[]
  error: string | undefined
}

export const HookedSelect = (props: HookedSelectProps) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => <Select
          {...field}
          options={props.options}
        />}
      />
      <ErrorMsg error={props.error} />
    </div>
  )
}

const StyledSelect = styled(ReactSelect)<CommonProps<any, false, any>>`
  & * {
    cursor: pointer !important;
    line-height: 1.5 !important;
  }

  & .css-1okebmr-indicatorSeparator {
    display: none;
  }
`

Select.displayName = 'Select'

export default Select
