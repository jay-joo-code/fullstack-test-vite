import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import theme from 'src/app/theme'
import useIsMobile from 'src/hooks/useIsMobile'
import Text from '../fonts/Text'
import Icon from '../icon'
import { FlexRow, Space } from '../layout'
import ErrorMsg from 'src/components/fonts/ErrorMsg'

interface IncrementorProps {
  value: number
  label: string
  onChange: (newValue: number) => void
  minValue?: number
  maxValue?: number
  step?: number
}

const Incrementor = ({
  value,
  label,
  onChange,
  minValue,
  maxValue,
  step = 1,
}: IncrementorProps) => {
  const isMobile = useIsMobile()
  const handleMinusClick = () => {
    const newValue = value - step
    if (minValue !== undefined) {
      onChange(Math.max(minValue, newValue))
    } else {
      onChange(newValue)
    }
  }

  const handlePlusClick = () => {
    const newValue = value + step
    if (maxValue !== undefined) {
      onChange(Math.min(maxValue, newValue))
    } else {
      onChange(newValue)
    }
  }

  return (
    <FlexRow
      alignCenter
      justifySpaceBetween
      fullWidth
    >
      <Text
        variant={isMobile ? 'h4' : 'p'}
        fontWeight={500}
      >
        {label}
      </Text>
      <FlexRow alignCenter>
        <Icon
          variant='remove-circle'
          fill={theme.brand}
          pointer
          size='2rem'
          onClick={handleMinusClick}
        />
        <Space padding='0 .5rem' />
        <Text variant='h4'>{value}</Text>
        <Space padding='0 .5rem' />
        <Icon
          variant='add-circle'
          fill={theme.brand}
          pointer
          size='2rem'
          onClick={handlePlusClick}
        />
      </FlexRow>
    </FlexRow>
  )
}

interface HookedIncrementorProps {
  name: string
  label: string
}

export const HookedIncrementor = (props: HookedIncrementorProps) => {
  const { register, getValues, setValue, formState: { errors } } = useFormContext()

  useEffect(() => {
    register(props.name)
  }, [register])

  const handleChange = (newValue: number) => {
    setValue(props.name, newValue)
  }

  return (
    <div>
      <Incrementor
        value={getValues(props.name)}
        onChange={handleChange}
        label={props.label}
      />
      <ErrorMsg error={errors[props.name]?.message} />
    </div>
  )
}

export default Incrementor
