import { useCallback } from 'react'
import { apiService } from 'services'

export const useApi = () => {
  const fetchMethod = useCallback(async (method) => {
    try {
      const responseData = await method()
      return responseData
    } catch (error) {
      throw error
    }
  }, [])

  const fetchRewards = useCallback(() => fetchMethod(apiService.getRewards), [fetchMethod])

  return { fetchRewards }
}
