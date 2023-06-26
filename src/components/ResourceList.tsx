import React from 'react'
import { SearchFilter, PreparedResource } from '../types'
import getFilteredResources from '../utils/getFilteredResources'
import ResourceListCard from './ResourceListCard'

function ResourceList(props: Props) {
  const filteredResources = getFilteredResources({
    resources: props.resources,
    filter: props.filter,
  })

  return (
    <div>
      <p className="text-xl mt-4">
        Found {filteredResources.length}{' '}
        {filteredResources.length === 1 ? 'resource' : 'resources'}
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
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
  filter: SearchFilter
}

export default ResourceList
