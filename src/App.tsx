import React, { ChangeEvent, useState } from 'react'
import { useApi } from './api'
import ResourceList from './components/ResourceList'
import { Filter } from './types'
import getFilteredResources from './utils/getFilteredResources'

export const App = () => {
  const { data, preparedResponse, isLoading } = useApi({
    method: 'search.map',
    params: {
      filter: {
        // onlyAvailable: false,
        // models: ["Corsa"],
        // fuelType: "benzine",
        // towbar: true,
        // winterTires: true,
      },
      locationPoint: {
        latitudeMax: 56,
        latitudeMin: 48,
        longitudeMax: 9,
        longitudeMin: 1,
      },
    },
  })

  const [filter, setFilter] = useState<Filter>({})

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, model: event.target.value })
  }

  const handleFilterChange =
    (key: keyof Filter) => (event: ChangeEvent<HTMLInputElement>) => {
      setFilter({ ...filter, [key]: event.target.value })
    }

  if (isLoading) {
    return <>Loading...</>
  }

  if (!data) {
    return <>No data</>
  }

  const filteredResources = getFilteredResources({
    resources: preparedResponse?.results || [],
    filter,
  })

  return (
    <>
      <input
        type="text"
        placeholder="Search model..."
        onChange={handleSearch}
      />
      <input
        type="text"
        placeholder="Filter fuel type..."
        onChange={handleFilterChange('fuelType')}
      />
      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            setFilter({ ...filter, availability: e.target.checked })
          }
        />
        Available
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            setFilter({ ...filter, winterTires: e.target.checked })
          }
        />
        Winter Tires
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) => setFilter({ ...filter, towbar: e.target.checked })}
        />
        Towbar
      </label>
      <ResourceList resources={filteredResources} filter={filter} />
    </>
  )
  // return isLoading ? <>Loading...</> : <>{JSON.stringify(data)}</>
}
