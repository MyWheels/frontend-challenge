import React from 'react'
import { PreparedResource } from '../types'
import isEmpty from '../utils/isEmpty'
import NoData from './NoData'
import ResourceListCard from './ResourceListCard'

function ResourceList(props: Props) {
  console.log('props.resources', props.resources)
  return isEmpty(props.resources) ? (
    <NoData />
  ) : (
    <div>
      <p className="text-xl mt-4">
        Found {props.resources.length}{' '}
        {props.resources.length === 1 ? 'resource' : 'resources'}
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

interface Props {
  resources: PreparedResource[]
}

export default ResourceList
