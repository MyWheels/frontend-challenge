import React from 'react'
import { Filter, PreparedResource } from '../types'
import getFilteredResources from '../utils/getFilteredResources'

function ResourceList(props: Props) {
  const filteredResources = getFilteredResources({
    resources: props.resources,
    filter: props.filter,
  })

  return (
    <div>
      <p className="text-xl mt-4">
        Found {filteredResources.length}{' '}
        {filteredResources.length === 1 ? 'resources' : 'resource'}
      </p>
      <ul className="mt-4 w-full flex flex-col items-center">
        {filteredResources.map((resource) => (
          <li key={resource.id} className="border-gray-400 flex flex-row mb-2">
            <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4">
              <div className="flex-1 pl-1 mr-16">
                <div className="font-medium">
                  {!resource.brand || !resource.model
                    ? resource.alias
                    : `${resource.brand} ${resource.model}`}
                </div>
                <div className="text-gray-600 text-sm">
                  {resource.fuelType} -{' '}
                  {resource.availability ? 'Available' : 'Not available'} - $
                  {resource.ratePerHour}/hour
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface Props {
  resources: PreparedResource[]
  filter: Filter
}

export default ResourceList
