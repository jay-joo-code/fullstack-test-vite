import moment from 'moment'
import React, { useState } from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { Controller } from 'react-hook-form'
import useIsMobile from 'src/hooks/useIsMobile'
import styled from 'styled-components'
import ErrorMsg from '../fonts/ErrorMsg'
import Label from '../fonts/Label'
import './datepicker.less'
import { DateRangePicker as DateRangePickerAirbnb } from 'react-dates'

interface DateRangePickerProps {
  label: string
  startDate: Date | undefined
  endDate: Date | undefined
  setStartDate: (newDate: any) => void
  setEndDate: (newDate: any) => void
}

const DateRangePicker = ({ label, startDate, endDate, setStartDate, setEndDate }: DateRangePickerProps) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const handleFocusChange = (newFocus) => setFocusedInput(newFocus)

  const handleDateChange = ({ startDate: startDateAirbnb, endDate: endDateAirbnb }) => {
    if (startDateAirbnb) setStartDate(startDateAirbnb.toDate())
    if (endDateAirbnb) setEndDate(endDateAirbnb.toDate())
  }

  const isMobile = useIsMobile()

  return (
    <StyledDateRangeWrapper>
      <Label>{label}</Label>
      <DateRangePickerAirbnb
        startDateId='start-date-id'
        endDateId='end-date-id'
        startDate={startDate ? moment(startDate) : null}
        endDate={endDate ? moment(endDate) : null}
        onDatesChange={handleDateChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        withPortal={isMobile}
        orientation={isMobile ? 'vertical' : 'horizontal'}
        readOnly
      />
    </StyledDateRangeWrapper>
  )
}

interface HookedDateRangePickerProps {
  name: string
  control: any
  setValue: Function
  error?: string
}

export const HookedDateRangePicker = (props: HookedDateRangePickerProps) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ onChange, value }) =>
          <DateRangePicker
            label='dateRangePickerName'
            startDate={value?.startDate}
            endDate={value?.endDate}
            setStartDate={(date) => props.setValue('dateRangePickerName', { ...value, startDate: date })}
            setEndDate={(date) => props.setValue('dateRangePickerName', { ...value, endDate: date })}
          />
        }
      />
      <ErrorMsg error={props.error} />
    </div>
  )
}

const StyledDateRangeWrapper = styled.div`
  & .DateRangePicker {
    width: 100%;
  }

  & .DateInput {
    width: 105px;
  }

  & input {
    cursor: pointer !important;
    font-size: .8rem;
    font-weight: 400;
  }
`

export default DateRangePicker
