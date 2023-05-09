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
      <p>Found resources: {filteredResources.length}</p>
      {filteredResources.map((resource) => (
        <div key={resource.id}>
          <p>Brand: {resource.brand}</p>
          <p>Model: {resource.model}</p>
          <p>Address: {resource.address}</p>
          <p>Fuel type: {resource.fuelType}</p>
          <p>Availability: {resource.availability ? 'Yes' : 'No'}</p>
          <p>Rate per hour: {resource.ratePerHour}</p>
        </div>
      ))}
    </div>
  )
}

interface Props {
  resources: PreparedResource[]
  filter: Filter
}

export default ResourceList
