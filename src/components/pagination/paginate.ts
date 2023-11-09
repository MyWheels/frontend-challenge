import { PreparedResource } from '../../types'

type PaginateOptions = {
  currentPage: number
  itemsPerPage: number
  resources: PreparedResource[]
}

function paginate(options: PaginateOptions) {
  // Calculate the indices of the first and last items on the current page
  const indexOfLastItem = options.currentPage * options.itemsPerPage
  const indexOfFirstItem = indexOfLastItem - options.itemsPerPage

  // Slice the items array to get only the items for the current page
  return options.resources.slice(indexOfFirstItem, indexOfLastItem)
}

export default paginate
