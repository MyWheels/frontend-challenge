import { SearchFilter, PreparedResource, Model } from '../types'

interface FilterOptions {
  resources: PreparedResource[]
  filter: SearchFilter
}

function getFilteredResources(options: FilterOptions): PreparedResource[] {
  return options.resources.filter((resource) =>
    (Object.keys(options.filter) as (keyof SearchFilter)[]).every((key) => {
      const resourceValue = resource[key as keyof PreparedResource]
      const filterValue = options.filter[key]

      // Special case for onlyAvailable
      if (key === 'onlyAvailable' && filterValue) {
        return resource.availability?.status === 'available'
      }

      // Special case for models
      if (key === 'models') {
        const models = options.filter[key] as Model[]
        return models.includes(resource.model as Model)
      }

      // Skip filter if not set
      if (!filterValue) return true

      // Perform case-insensitive comparison for strings
      if (
        typeof resourceValue === 'string' &&
        typeof filterValue === 'string'
      ) {
        return resourceValue.toLowerCase().includes(filterValue.toLowerCase())
      }

      // For non-string types
      return resourceValue === filterValue
    }),
  )
}

export default getFilteredResources
