'use client'
import React, { useCallback, useEffect } from 'react'
import { CheckboxField, useFormFields, useForm, Button } from '@payloadcms/ui'
import { CheckboxFieldClientProps } from 'payload'

const IsRefundedField = ({
  checkboxLockFieldPath,
  ...props
}: CheckboxFieldClientProps & {
  checkboxLockFieldPath: string
}) => {
  // const { label } = props.field
  const { dispatchFields } = useForm()

  const checkboxLockValue = useFormFields(([fields]) => {
    return fields[checkboxLockFieldPath]?.value as boolean
  })
  const checkboxValue = useFormFields(([fields]) => {
    return fields[props.path]?.value as boolean
  })
  useEffect(() => {
    dispatchFields({
      type: 'UPDATE',
      path: 'status',
      value: checkboxValue === true ? 'cancelled' : 'paid',
    })
  }, [checkboxValue])

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()
      // console.log('[UPDATE]', checkboxLockValue)
      // if (checkboxLockValue === undefined) return;
      dispatchFields({
        type: 'UPDATE',
        path: checkboxLockFieldPath,
        value: !checkboxLockValue,
      })
    },
    [checkboxLockValue, checkboxLockFieldPath, dispatchFields],
  )
  const readOnly = props.readOnly || checkboxLockValue

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        {/* <FieldLabel htmlFor={`field-${props.path}`} label={label} /> */}
        <Button className="lock-button" buttonStyle="none" onClick={handleLock}>
          {checkboxLockValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>
      <CheckboxField {...props} readOnly={readOnly} />
    </div>
  )
}

export default IsRefundedField
