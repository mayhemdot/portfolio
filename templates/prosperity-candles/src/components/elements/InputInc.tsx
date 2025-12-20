import { FC, useEffect, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Minus, Plus } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface IInputIncProps {
  className?: string
  classNameInput?: string
  defaultValue?: number
  isDisabled?: boolean
  maxValue: number
  minValue: number
  register?: UseFormRegisterReturn
  onChangeValue: (value: number) => void
}

const InputInc: FC<IInputIncProps> = ({
  maxValue,
  minValue,
  defaultValue,
  className,
  isDisabled,
  classNameInput,
  register,
  onChangeValue,
}) => {
  const [value, setValue] = useState(defaultValue ?? 0)

  useEffect(() => {
    onChangeValue(Math.min(value, maxValue))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, maxValue])
  // useEffect(() => {
  //   setValue(Math.min(value, maxValue))
  // }, [maxValue])

  return (
    <div
      className={cn(
        'inline-flex w-fit items-center rounded-2xl border border-dark-beige-color',
        className
      )}
    >
      <button
        aria-label={'Уменьшить число товаров'}
        disabled={minValue === value || isDisabled || false}
        className={buttonVariants({
          variant: 'ghost',
          size: 'cube',
          className:
            'rounded-bl-2xl inline-flex rounded-br-none rounded-tl-2xl rounded-tr-none bg-beige-color',
        })}
        onClick={(e) => {
          e.preventDefault()
          setValue((value) => (value - 1 < minValue ? minValue : value - 1))
        }}
      >
        <Minus className={'size-3 md:size-4'} aria-hidden={true} />
      </button>

      <Input
        disabled={isDisabled ?? false}
        type="number"
        min={minValue}
        max={maxValue}
        value={value}
        {...register}
        onChange={(e: any) => {
          const newValue = parseInt(e.target.value)
          if (newValue) setValue(newValue)
        }}
        className={cn(
          'fsNormal relative size-12 rounded-none border-0 bg-beige-color text-center focus-visible:!shadow-none focus-visible:ring-0 focus-visible:ring-offset-0',
          classNameInput
        )}
      />

      <button
        aria-label={'Увеличить число товаров'}
        disabled={maxValue === value || isDisabled || false}
        className={buttonVariants({
          variant: 'ghost',
          size: 'cube',
          className:
            'rounded-bl-none inline-flex rounded-br-2xl rounded-tl-none rounded-tr-2xl bg-beige-color',
        })}
        onClick={(e: any) => {
          e.preventDefault()
          setValue((value) => Math.min(value + 1, maxValue))
        }}
      >
        <Plus className={'size-3 border-input md:size-4'} aria-hidden={true} />
      </button>
    </div>
  )
}

export default InputInc
