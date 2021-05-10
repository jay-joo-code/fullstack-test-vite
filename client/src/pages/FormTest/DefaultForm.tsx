import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/buttons'
import Checkbox, { HookedCheckbox } from 'src/components/formElements/Checkbox'
import Input, { HookedInput } from 'src/components/formElements/Input'
import { HookedRadioGroup } from 'src/components/formElements/RadioGroup'
import { HookedSelect } from 'src/components/formElements/Select'
import Textarea from 'src/components/formElements/Textarea'
import { FlexRow } from 'src/components/layout'
import styled from 'styled-components'
import * as yup from 'yup'

const schema = yup.object().shape({
  inputName: yup.string().required('This is a required field'),
  textareaName: yup.string().required('This is a required field'),
  checkboxName: yup.boolean().oneOf([true], 'Must check this checkbox'),
  selectName: yup.object()
    .required('Must select an option'),
  radioGroupName: yup.string()
    .typeError('Must choose an option')
    .required('Must choose an option'),
  // datePickerName: yup.date().typeError('Must pick a date'),
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
}

const DefaultForm = () => {
  const { register, handleSubmit, formState: { errors }, watch, control } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   inputName: 'default text',
    //   textAreaName: 'default text',
    //   checkboxName: false,
    //   selectName: null,
    //   radioGroupName: null,
    //   datePickerName: null,
    //   dateRangePickerName: null,
    //   incrementorName: 1,
    // },
  })

  console.log('watch(inputName) :>> ', watch('inputName'))
  // console.log('errors :>> ', errors)

  const onSubmit = (data: IFormData) => {
    console.log('onSubmit', data)
  }

  // local states
  const [inputValue, setInputValue] = useState<string>('')
  const [textareaValue, setTextareaValue] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* local state */}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
        />

        {/* react-hook-form */}
        <HookedInput
          {...register('inputName')}
          label='inputName'
          error={errors.inputName?.message}
          fullWidth
        />

        {/* local state */}
        <Textarea
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          error={errors.textareaName?.message}
          minRows={3}
          maxRows={5}
        />

        {/* react-hook-form */}
        <Textarea
          {...register('textareaName')}
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
          {...register('checkboxName')}
          label='checkboxName'
          error={errors.checkboxName?.message}
        />

        {/* react-hook-form */}
        <HookedSelect
          name='selectName'
          control={control}
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ]}
          error={errors.selectName?.message}
        />

        {/* react-hook-form */}
        <HookedRadioGroup
          {...register('radioGroupName')}
          error={errors.radioGroupName?.message}
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ]}
        />
        {/*
        <HookedDatePicker
          name='datePickerName'
          control={control}
          error={errors.datePickerName?.message}
        />
        <HookedDateRangePicker
          name='dateRangePickerName'
          control={control}
          setValue={setValue}
          error={errors.dateRangePickerName?.message}
        />
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
