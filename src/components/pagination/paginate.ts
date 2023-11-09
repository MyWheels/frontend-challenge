import { PreparedResource } from '../../types'

type PaginateOptions = {
  currentPage: number
  itemsPerPage: number
  resources: PreparedResource[]
}

export type PaginateResult = {
  resources: PreparedResource[]
  startIndex: number
  endIndex: number
}

function paginate(options: PaginateOptions): PaginateResult {
  // Calculate the indices of the first and last items on the current page
  const endIndex = options.currentPage * options.itemsPerPage
  const startIndex = endIndex - options.itemsPerPage

  // Slice the items array to get only the items for the current page
  const resources = options.resources.slice(startIndex, endIndex)

  return { resources, startIndex, endIndex }
}

export default paginate
