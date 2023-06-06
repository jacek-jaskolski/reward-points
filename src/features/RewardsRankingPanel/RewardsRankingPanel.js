import React, { useEffect, useState } from 'react'
import { Spinner, Panel, Error } from 'components'
import { useApi } from 'hooks'
import { Ranking } from './components/Ranking'

import './RewardsRankingPanel.css'

export const RewardsRankingPanel = () => {
  const { fetchRewards } = useApi()
  const [rewards, setRewards] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const fetchedRewards = await fetchRewards()
        setRewards(fetchedRewards)
        setIsLoading(false)
      } catch (error) {
        setTimeout(() => {
          setIsLoading(false)
          setError(error)
        }, 1000) // to see the spinner
      }
    }
    fetchData()
  }, [fetchRewards])

  return (
    <Panel title="Rewards ranking">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Error
          title="Something went wrong"
          body="For some reason, we couldn't load this component. Please confirm you are connected
                      to the internet. If the issue continues to repeat, contact the administrator."
        />
      ) : (
        rewards && <Ranking records={rewards.records} rankingMonths={rewards.rankingMonths} />
      )}
    </Panel>
  )
}
