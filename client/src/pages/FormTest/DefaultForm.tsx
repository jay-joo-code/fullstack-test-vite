import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from 'src/components/buttons'
import Checkbox, { HookedCheckbox } from 'src/components/formElements/Checkbox'
import Input, { HookedInput } from 'src/components/formElements/Input'
import RadioGroup, { HookedRadioGroup } from 'src/components/formElements/RadioGroup'
import Select, { HookedSelect, ISelectOption } from 'src/components/formElements/Select'
import Textarea, { HookedTextarea } from 'src/components/formElements/Textarea'
import { FlexRow } from 'src/components/layout'
import styled from 'styled-components'
import * as yup from 'yup'
import Datepicker, { HookedDatePicker } from 'src/components/formElements/DatePicker'
import DateRangePicker, { HookedDateRangePicker, IDates } from 'src/components/formElements/DateRangePicker'

const schema = yup.object().shape({
  inputName: yup.string().required('This is a required field'),
  textareaName: yup.string().required('This is a required field'),
  checkboxName: yup.boolean().oneOf([true], 'Must check this checkbox'),
  selectName: yup.object()
    .required('Must select an option'),
  radioGroupName: yup.string()
    .typeError('Must choose an option')
    .required('Must choose an option'),
  datePickerName: yup.date().typeError('Must pick a date'),
  // dateRangePickerName: yup.object()
  //   .shape({
  //     startDate: yup.date().typeError('Must pick a start date'),
  //     endDate: yup.date().typeError('Must pick an end date'),
  //   })
  //   .typeError('Must select a date range')
  //   .required('Must select a date range'),
  // incrementorName: yup.number().min(3, 'Minimum 3 required'),
})

interface IFormData {
  inputName: string
  textAreaName: string
  checkboxName: boolean
  selectName: ISelectOption,
  radioGroupName: string,
  datePickerName: Date,
  dateRangePickerName: IDates
}

const DefaultForm = () => {
  const methods = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      inputName: 'default text',
      textAreaName: 'default text',
      checkboxName: false,
      selectName: undefined,
      radioGroupName: undefined,
      datePickerName: undefined,
      dateRangePickerName: {
        startDate: new Date(),
        endDate: new Date(),
      },
    },
  })
  const { register, handleSubmit, formState: { errors }, watch, control } = methods

  console.log('watch(checkboxName) :>> ', watch('checkboxName'))
  // console.log('errors :>> ', errors)

  const onSubmit = (data: IFormData) => {
    console.log('onSubmit', data)
  }

  // local states
  const [inputValue, setInputValue] = useState<string>('')
  const [textareaValue, setTextareaValue] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>('')
  const [radioValue, setRadioValue] = useState<string>('')
  const [datePickerValue, setDatePickerValue] = useState<Date>(new Date())
  const [dateRangePickerValue, setDateRangePickerValue] = useState<IDates>({
    startDate: new Date(),
    endDate: new Date(),
  })

  // console.log('dateRangePickerValue :>> ', dateRangePickerValue)

  return (
    <Container>
      <FormProvider {...methods} >
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* local state */}
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
          />

          {/* react-hook-form */}
          <HookedInput
            label='inputName'
            name='inputName'
            fullWidth
          />

          {/* local state */}
          <Textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            minRows={3}
            maxRows={5}
          />

          {/* react-hook-form */}
          <HookedTextarea
            {...register('textAreaName')}
            label='textAreaName'
            minRows={3}
            maxRows={5}
          />

          {/* local state */}
          <Checkbox
            label='checkboxName'
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />

          {/* react-hook-form */}
          <HookedCheckbox
            label='checkboxName'
            name='checkboxName'
          />

          {/* local state */}
          <Select
            value={selected}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
            onChange={(option) => setSelected(option.value)}
          />

          {/* react-hook-form */}
          <HookedSelect
            name='selectName'
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />

          {/* local state */}
          <RadioGroup
            value={radioValue}
            setValue={(newValue) => setRadioValue(newValue)}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />

          {/* react-hook-form */}
          <HookedRadioGroup
            name='radioGroupName'
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />

          {/* local state */}
          <Datepicker
            date={datePickerValue}
            setDate={setDatePickerValue}
          />

          {/* react-hook-form */}
          <HookedDatePicker
            name='datePickerName'
            control={control}
            error={errors.datePickerName?.message}
          />

          {/* local state */}
          <DateRangePicker
            dates={dateRangePickerValue}
            setDates={setDateRangePickerValue}
          />

          {/* react-hook-form */}
          <HookedDateRangePicker
            name='dateRangePickerName'
          />

          {/*
          <HookedIncrementor
            name='incrementorName'
            control={control}
            label='incrementorName'
            error={errors.incrementorName?.message}
          /> */}
          <FlexRow justifyEnd>
            <Button
              label='Submit'
              type='submit'
            />
          </FlexRow>
        </Form>
      </FormProvider>
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;

  /* datepickers need at least 350px width */
  min-width: 350px; 
`

const Form = styled.form`
  & > * {
    margin-bottom: 1rem;
  }
`

export default DefaultForm
