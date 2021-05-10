import React from 'react'
import { Controller } from 'react-hook-form'
import theme from 'src/app/theme'
import useIsMobile from 'src/hooks/useIsMobile'
import Text from '../fonts/Text'
import Icon from '../icon'
import { FlexRow } from '../layout'
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
        <FlexRow
          justifyCenter
          alignCenter
          style={{ width: '40px' }}
        >
          <Text variant='h4'>{value}</Text>
        </FlexRow>
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
  control: any
  label: string
  error?: string
}

export const HookedIncrementor = (props: HookedIncrementorProps) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ onChange, value }) =>
          <Incrementor
            label={props.label}
            value={value}
            onChange={onChange}
          />
        }
      />
      <ErrorMsg error={props.error} />
    </div>
  )
}

export default Incrementor
