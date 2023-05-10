import React, { ChangeEvent, useState } from 'react'
import { useApi } from './api'
import Container from './components/Container'
import FilterForm from './components/filters/FilterForm'
import { Filter } from './types'
import Loader from './components/Loader'
import NoData from './components/NoData'
import ResourceList from './components/ResourceList'

export const App = () => {
  const [filter, setFilter] = useState<Filter>({
    availability: false,
    // model: 'Corsa',
    // models: ['Corsa'],
    fuelType: '',
    towbar: false,
    winterTires: false,
  })

  const { data, preparedResponse, isLoading } = useApi({
    method: 'search.map',
    params: {
      // TODO: use filtering for the search
      filter: {
        onlyAvailable: filter.availability,
        // models: [filter.model],
        fuelType: filter.fuelType || null,
        towbar: filter.towbar,
        winterTires: filter.winterTires,
      },
      locationPoint: {
        latitudeMax: 56,
        latitudeMin: 48,
        longitudeMax: 9,
        longitudeMin: 1,
      },
    },
    refetchOnPropsChange: [
      filter.availability,
      filter.towbar,
      filter.winterTires,
    ],
  })

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
    setFilter({ ...filter, model: event.target.value })

  const handleFilterChange =
    (key: keyof Filter) => (event: ChangeEvent<HTMLInputElement>) =>
      setFilter({ ...filter, [key]: event.target.value })

  const handleCheckboxChange = (key: keyof Filter, value: boolean) =>
    setFilter({ ...filter, [key]: value })

  if (isLoading) return <Loader />

  if (!data) return <NoData />

  // TODO: implement pagination and ajax filtering instead of local filtering
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <FilterForm
          searchPlaceholder="Search model..."
          filterPlaceholder="Filter fuel type..."
          filter={filter}
          onSearchChange={handleSearch}
          onFilterChange={handleFilterChange}
          onCheckboxChange={handleCheckboxChange}
        />
        <ResourceList
          resources={preparedResponse?.results || []}
          filter={filter}
        />
      </div>
    </Container>
  )
}
