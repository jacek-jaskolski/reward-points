import { API_ENDPOINTS } from './const'

const get = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      const message = (await response.json()) || 'Error retrieving data'
      throw new Error(`API error: ${response.status} ${response.statusText}. ${message}`)
    }
    return await response.json()
  } catch (error) {
    //toastService.error(error.message)
    throw error
  }
}

export const apiService = {
  getRewards: () => get(API_ENDPOINTS.REWARDS),
}
