import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'
import { emptyPreparedResponse } from './mock/preparedResponse.mock'

jest.mock('./api', () => ({
  useApi: () => ({
    preparedResponse: null,
    isLoading: true,
  }),
}))

describe('App Data', () => {
  it('displays a loader while fetching data', async () => {
    render(<App />)

    const loaderElement = screen.getByTestId('loader')
    expect(loaderElement).toBeInTheDocument()
  })

  it("Displays 'Loader' component when the api call is in process", async () => {
    jest.mock('./api', () => ({
      useApi: () => ({
        preparedResponse: emptyPreparedResponse,
        isLoading: true,
      }),
    }))

    render(<App />)

    const loaderElement = screen.getByTestId('loader')
    expect(loaderElement).toBeInTheDocument()
  })
})
