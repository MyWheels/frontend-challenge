import React, { ChangeEvent } from 'react'
import { SearchFilter } from '../../types'
import Checkbox from './Checkbox'
import Input from './Input'

function FilterForm(props: Props) {
  return (
    <div>
      {/*<Input*/}
      {/*  placeholder="Search..."*/}
      {/*  onChange={props.onSearchChange}*/}
      {/*/>*/}
      <Input
        placeholder="Filter fuel type..."
        onChange={props.onFilterChange('fuelType')}
      />
      <div className="mt-4">
        <Checkbox
          label="Available"
          checked={props.filter.onlyAvailable ?? false}
          onChange={(ev) =>
            props.onCheckboxChange('onlyAvailable', ev.target.checked)
          }
        />
        <Checkbox
          label="Winter Tires"
          checked={props.filter.winterTires ?? false}
          onChange={(ev) =>
            props.onCheckboxChange('winterTires', ev.target.checked)
          }
        />
        <Checkbox
          label="Towbar"
          checked={props.filter.towbar ?? false}
          onChange={(ev) => props.onCheckboxChange('towbar', ev.target.checked)}
        />
      </div>
    </div>
  )
}

interface Props {
  filter: SearchFilter
  onFilterChange: (
    key: keyof SearchFilter,
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  onCheckboxChange: (key: keyof SearchFilter, value: boolean) => void
}

export default FilterForm
