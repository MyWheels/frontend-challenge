import React, { useMemo, useState } from 'react'
import { useApi } from './api'
import Container from './components/Container'
import FilterForm from './components/filters/FilterForm'
import Loader from './components/Loader'
import Pagination from './components/pagination/Pagination'
import paginate from './components/pagination/paginate'
import ResourceList from './components/ResourceList'
import getFilteredResources from './utils/getFilteredResources'
import { SearchFilter } from './types'

const ITEMS_PER_PAGE = 10

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const [filter, setFilter] = useState<SearchFilter>({
    onlyAvailable: false,
    // model: 'Corsa',
    // models: ['Corsa'],
    fuelType: '',
    towbar: false,
    winterTires: false,
  })

  const { preparedResponse, isLoading } = useApi({
    method: 'search.map',
    params: {
      filter: {
        ...filter,
        fuelType: filter.fuelType || null,
      },
      locationPoint: {
        latitudeMax: 56,
        latitudeMin: 48,
        longitudeMax: 9,
        longitudeMin: 1,
      },
    },
  })

  const filteredResources = useMemo(
    () =>
      getFilteredResources({
        filter,
        resources: preparedResponse?.results || [],
        searchQuery,
      }),
    [preparedResponse?.results, filter, searchQuery],
  )

  const paginateResult = useMemo(
    () =>
      paginate({
        currentPage,
        itemsPerPage: ITEMS_PER_PAGE,
        resources: filteredResources,
      }),
    [currentPage, filteredResources],
  )

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <FilterForm
          filter={filter}
          onSearchChange={(ev) => setSearchQuery(ev.target.value)}
          onFilterChange={(key) => (ev) =>
            setFilter({ ...filter, [key]: ev.target.value })
          }
          onCheckboxChange={(key, value) =>
            setFilter({ ...filter, [key]: value })
          }
        />
        {isLoading ? (
          <Loader />
        ) : (
          <ResourceList
            {...paginateResult}
            totalItems={filteredResources.length}
          />
        )}
        <Pagination
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredResources.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </Container>
  )
}
