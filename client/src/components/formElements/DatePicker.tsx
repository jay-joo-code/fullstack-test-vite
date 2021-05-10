import React from 'react'
import styled from 'styled-components'
import { DayPickerSingleDateController, isInclusivelyAfterDay } from 'react-dates'
import moment from 'moment'
import { Controller } from 'react-hook-form'
import ErrorMsg from 'src/components/fonts/ErrorMsg'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './datepicker.less'

interface DatePickerProps {
  date: Date | null
  setDate: (newDate: any) => void
}

const DatePicker = (props: DatePickerProps) => {
  const handleDateChange = (newDate) => {
    props.setDate(newDate.toDate())
  }

  return (
    <StyledDateWrapper>
      <DayPickerSingleDateController
        {...props}
        onDateChange={handleDateChange}
        focused={true}
        date={props.date && moment(props.date)}
        hideKeyboardShortcutsPanel={true}
        isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
      />
    </StyledDateWrapper>
  )
}

interface HookedDatePickerProps {
  name: string
  control: any
  error?: string
}

export const HookedDatePicker = (props: HookedDatePickerProps) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ onChange, value }) =>
          <DatePicker
            setDate={onChange}
            date={value}
          />
        }
      />
      <ErrorMsg error={props.error} />
    </div>
  )
}

const StyledDateWrapper = styled.div`
  & .CalendarMonth_caption {
    padding-bottom: 50px !important;
  }

  & .CalendarMonth_table {
    td {
      vertical-align: middle;
    }
  }

  & .CalendarDay__selected {
    background: ${(props) => props.theme.brand};
    border-color: ${(props) => props.theme.brand};
  }
`
