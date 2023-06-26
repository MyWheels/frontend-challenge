import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { App } from './App'
import api from './api'
import { emptyPreparedResponse } from './mock/preparedResponse.mock'

jest.useFakeTimers()

describe('App Data', () => {
  it('displays a loader while fetching data', async () => {
    jest
      .spyOn(api, 'fetchResources')
      .mockResolvedValueOnce(emptyPreparedResponse)

    render(<App />)

    const element = screen.getByTestId('loader')
    expect(element).toBeInTheDocument()

    await act(async () => jest.runOnlyPendingTimers())

    const loaderElement = screen.queryByTestId('loader')
    expect(loaderElement).not.toBeInTheDocument()
  })

  it("Displays 'No data' component when there are no results", async () => {
    jest
      .spyOn(api, 'fetchResources')
      .mockResolvedValueOnce(emptyPreparedResponse)

    await act(async () => {
      render(<App />)
    })

    const element = screen.getByTestId('no-data')
    expect(element).toBeInTheDocument()
  })
})
