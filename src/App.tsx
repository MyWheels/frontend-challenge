import React, { ChangeEvent, useEffect, useState } from 'react'
import api from './api'
import Container from './components/Container'
import FilterForm from './components/filters/FilterForm'
import Loader from './components/Loader'
import NoData from './components/NoData'
import Pagination from './components/pagination/Pagination'
import ResourceList from './components/ResourceList'
import isEmpty from './utils/isEmpty'
import { PreparedResponse, SearchFilter } from './types'

const RESOURCE_LIMIT_PER_PAGE = 5

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [preparedResponse, setPreparedResponse] =
    useState<PreparedResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState<SearchFilter>({
    onlyAvailable: false,
    // model: 'Corsa',
    // models: ['Corsa'],
    fuelType: '',
    towbar: false,
    winterTires: false,
  })

  const fetchData = async () => {
    setIsLoading(true)

    const preparedResponse = await api.fetchResources({
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

    setPreparedResponse(preparedResponse)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

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

  const handleFilterChange =
    (key: keyof SearchFilter) => (event: ChangeEvent<HTMLInputElement>) =>
      setFilter({ ...filter, [key]: event.target.value })

  const onSelectModelChange = (model: string) => console.log('model', model)

  const handleCheckboxChange = (key: keyof SearchFilter, value: boolean) =>
    setFilter({ ...filter, [key]: value })

  if (isLoading) return <Loader />

  if (isEmpty(preparedResponse?.results)) return <NoData />

  // TODO: implement pagination and ajax filtering instead of local filtering
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <FilterForm
          searchPlaceholder="Search model..."
          filterPlaceholder="Filter fuel type..."
          filter={filter}
          onSelectModelChange={onSelectModelChange}
          onFilterChange={handleFilterChange}
          onCheckboxChange={handleCheckboxChange}
        />
        <ResourceList
          resources={preparedResponse?.results || []}
          filter={filter}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={
            preparedResponse
              ? Math.ceil(preparedResponse.total / RESOURCE_LIMIT_PER_PAGE)
              : 0
          }
          onPageChange={setCurrentPage}
        />
      </div>
    </Container>
  )
}
