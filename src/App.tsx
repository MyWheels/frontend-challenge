import React, { ChangeEvent, useMemo, useState } from 'react'
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

  // const fetchData = async () => {
  //   const { data, preparedResponse, isLoading } = useApi({
  //     method: 'search.map',
  //     params: {
  //       // TODO: use filtering for the search
  //       filter: {
  //         onlyAvailable: filter.availability,
  //         // models: [filter.model],
  //         fuelType: filter.fuelType || null,
  //         towbar: filter.towbar,
  //         winterTires: filter.winterTires,
  //       },
  //       locationPoint: {
  //         latitudeMax: 56,
  //         latitudeMin: 48,
  //         longitudeMax: 9,
  //         longitudeMin: 1,
  //       },
  //     },
  //   })
  //
  //   return { data, preparedResponse, isLoading }
  // }

  // const { data, preparedResponse, isLoading } = useApi({
  //   method: 'search.map',
  //   params: {
  //     // TODO: use filtering for the search
  //     filter: {
  //       onlyAvailable: filter.availability,
  //       // models: [filter.model],
  //       fuelType: filter.fuelType || null,
  //       towbar: filter.towbar,
  //       winterTires: filter.winterTires,
  //     },
  //     locationPoint: {
  //       latitudeMax: 56,
  //       latitudeMin: 48,
  //       longitudeMax: 9,
  //       longitudeMin: 1,
  //     },
  //   },
  //   refetchOnPropsChange: [
  //     filter.availability,
  //     filter.towbar,
  //     filter.winterTires,
  //   ],
  // })

  // const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
  //   setFilter({ ...filter, model: event.target.value })

  const filteredResources = useMemo(
    () =>
      getFilteredResources({
        resources: preparedResponse?.results || [],
        filter,
      }),
    [preparedResponse?.results, filter],
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

  const handleFilterChange =
    (key: keyof SearchFilter) => (event: ChangeEvent<HTMLInputElement>) =>
      setFilter({ ...filter, [key]: event.target.value })

  const handleCheckboxChange = (key: keyof SearchFilter, value: boolean) =>
    setFilter({ ...filter, [key]: value })

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <FilterForm
          filter={filter}
          onFilterChange={handleFilterChange}
          onCheckboxChange={handleCheckboxChange}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <ResourceList
            paginateResult={paginateResult}
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
