import React from 'react'
import { Calendar, OnChangeProps } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Control, Controller } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMsg from '../fonts/ErrorMsg'

interface DatePickerProps {
  date: Date
  setDate: (date: Date) => void
}

const DatePicker = (props: DatePickerProps) => {
  const handleChange = (range: OnChangeProps) => {
    const date = new Date(range as Date)
    props.setDate(date)
  }

  return (
    <StyledCalendar
      date={props.date}
      onChange={handleChange}
    />
  )
}

interface HookDatePickerProps {
  name: string
  control: any
  error?: string
}

export const HookedDatePicker = (props: HookDatePickerProps) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => {
          return (
            <StyledCalendar
              {...field}
              date={field.value}
            />
          )
        }}
      />
      <ErrorMsg error={props.error} />
    </div>
  )
}

const StyledCalendar = styled(Calendar)`
  & .rdrDay {
    color: ${props => props.theme.brand} !important;
  }
  & .rdrSelected {
    color: ${props => props.theme.brand} !important;
  }
  & .rdrDayStartPreview {
    color: ${props => props.theme.brand} !important;
  }
  & .rdrDayEndPreview {
    color: ${props => props.theme.brand} !important;
  }
  & .rdrDayToday {
    color: ${props => props.theme.brand} !important;
  }
  & .rdrDayToday span:after {
    background: ${props => props.theme.brand} !important;
    opacity: .5;
  }
`

export default DatePicker
