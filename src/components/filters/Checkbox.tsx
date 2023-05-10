import React, { ChangeEvent } from 'react'

function Checkbox(props: Props) {
  return (
    <label className="inline-flex items-center ml-6">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        checked={props.checked}
        onChange={props.onChange}
      />
      <span className="ml-2 text-gray-700">{props.label}</span>
    </label>
  )
}

interface Props {
  label: string
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default Checkbox
