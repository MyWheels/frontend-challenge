import React, { ReactNode } from 'react'

function Container(props: Props) {
  return (
    <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
      {props.children}
    </div>
  )
}

interface Props {
  children: ReactNode
}

export default Container
