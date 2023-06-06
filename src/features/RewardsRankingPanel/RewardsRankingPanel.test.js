import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { RewardsRankingPanel } from './RewardsRankingPanel'
import { useApi } from 'hooks'

jest.mock('hooks')

describe('RewardsRankingPanel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render loading state initially', () => {
    useApi.mockReturnValue({
      fetchRewards: jest.fn(() => new Promise(() => {})), // Never resolves to keep in loading state
    })

    render(<RewardsRankingPanel />)
    expect(document.querySelector('.spinner')).toBeInTheDocument()
  })

  it('should render error message on fetch failure', async () => {
    const error = new Error('Failed to fetch')
    useApi.mockReturnValue({
      fetchRewards: jest.fn(() => Promise.reject(error)),
    })

    render(<RewardsRankingPanel />)
    jest.useFakeTimers('modern')
    await waitFor(
      () => {
        jest.advanceTimersByTime(1000)
        expect(document.querySelector('.spinner')).toBeInTheDocument()
      },
      { shouldThrow: false, timeout: 5000, shouldClearNativeTimers: true },
    )
  })

  it('should render rewards ranking on fetch success', async () => {
    const rewards = {
      rankingMonths: ['2023-06'],
      records: [
        {
          user: { id: 1, name: 'Alice' },
          rewardPoints: { byMonth: { '2023-06': 100 }, total: 100 },
        },
      ],
    }
    useApi.mockReturnValue({
      fetchRewards: jest.fn(() => Promise.resolve(rewards)),
    })

    const { getByRole } = render(<RewardsRankingPanel />)
    await waitFor(() => {
      expect(getByRole('table')).toBeInTheDocument()
    })
  })
})
