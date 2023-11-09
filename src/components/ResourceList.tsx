import React from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import isEmpty from '../utils/isEmpty'
import NoData from './NoData'
import { PaginateResult } from './pagination/paginate'
import ResourceListCard from './ResourceListCard'

function ResourceList(props: Props) {
  const [parent] = useAutoAnimate()

  console.log('ResourceList', props.resources)
  return isEmpty(props.resources) ? (
    <NoData />
  ) : (
    <div>
      <p className="text-xl mt-4">
        {`Showing ${props.startIndex + 1} to ${props.endIndex} of ${
          props.totalItems
        } vehicles`}
      </p>
      <ul
        className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        ref={parent}
      >
        {props.resources.map((resource) => (
          <div
            key={resource.id}
            className="transition-transform duration-300 ease-in-out transform delay-100"
          >
            <ResourceListCard resource={resource} />
          </div>
        ))}
      </ul>
    </div>
  )
}

interface Props extends PaginateResult {
  totalItems: number
}

export default ResourceList
