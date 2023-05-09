import { Filter, PreparedResource } from '../types'

interface FilterOptions {
  resources: PreparedResource[]
  filter: Filter
}

function getFilteredResources(options: FilterOptions): PreparedResource[] {
  return options.resources.filter((resource) =>
    (Object.keys(options.filter) as (keyof Filter)[]).every((key) => {
      const resourceValue = resource[key as keyof PreparedResource]
      const filterValue = options.filter[key]

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
