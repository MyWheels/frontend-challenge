import React, { ChangeEvent } from 'react'
import { Filter } from '../../types'
import Checkbox from './Checkbox'
import Input from './Input'

function FilterForm(props: Props) {
  return (
    <div>
      <Input
        placeholder={props.searchPlaceholder}
        onChange={props.onSearchChange}
      />
      <Input
        placeholder={props.filterPlaceholder}
        onChange={props.onFilterChange('fuelType')}
      />
      <div className="mt-4">
        <Checkbox
          label="Available"
          checked={props.filter.availability ?? false}
          onChange={(ev) =>
            props.onCheckboxChange('availability', ev.target.checked)
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
  searchPlaceholder: string
  filterPlaceholder: string
  filter: Filter
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onFilterChange: (
    key: keyof Filter,
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  onCheckboxChange: (key: keyof Filter, value: boolean) => void
}

export default FilterForm
