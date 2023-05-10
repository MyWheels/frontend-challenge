import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'
import { useApi } from './api'

jest.mock('./api', () => ({
  ...jest.requireActual('./api'),
  useApi: jest.fn(() => ({ isLoading: true, data: null })),
}))

describe('App', () => {
  it("shows that it's loading", () => {
    ;(useApi as jest.Mock).mockImplementation(() => ({
      isLoading: true,
      data: null,
    }))
    render(<App />)
    const element = screen.getByTestId('loader')
    expect(element).toBeInTheDocument()
  })

  it("shows a 'No data' message when there's no data it's loading", () => {
    ;(useApi as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: null,
    }))
    render(<App />)
    const element = screen.getByText('No data available')
    expect(element).toBeInTheDocument()
  })
})
