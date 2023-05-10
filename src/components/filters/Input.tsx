import React, { ChangeEvent } from 'react'

function Input(props: Props) {
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}

interface Props {
  placeholder: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default Input
