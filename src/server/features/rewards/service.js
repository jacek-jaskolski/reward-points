const initialValue = 0

/**
 * Creates a reward points calculator object that can calculate reward points based on a set of tiers.
 * @param {Array} tiers - An array of tier objects that define the reward points tiers.
 * @returns {Object} A reward points calculator object with a `calculate` method.
 */
const createRewardPointsCalculator = (tiers) => ({
  calculate: (amount) =>
    tiers.reduce((rewardPoints, { minAmount, maxAmount, multiplier }) => {
      if (amount > minAmount) {
        const eligibleAmount = maxAmount
          ? Math.min(amount, maxAmount) - minAmount
          : amount - minAmount
        rewardPoints += Math.floor(eligibleAmount) * multiplier
      }
      return rewardPoints
    }, initialValue),
})

/**
 * Returns a string key for a given date that represents the month and year.
 * @param {Date} date - The date to get the month key for.
 * @returns {string} A string key in the format "YYYY-MM" representing the month and year.
 */
const getMonthKeyFromDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

/**
 * Returns an object containing the ranking months and records for a given array of transactions, users, and tiers.
 * @param {Array} transactions - An array of transaction objects.
 * @param {Object} users - An object containing user objects keyed by user ID.
 * @param {Array} tiers - An array of tier objects that define the reward points tiers.
 * @returns {Object} An object containing the ranking months and records.
 */
module.exports = (transactions, users, tiers) => {
  const rewardPointsCalculator = createRewardPointsCalculator(tiers)
  const distinctMonths = []
  const rewardsByUserInEachMonthAndTotal = {}

  transactions.forEach(({ customerId, date, amount }) => {
    const user = users[customerId]

    if (user) {
      if (!rewardsByUserInEachMonthAndTotal[customerId]) {
        rewardsByUserInEachMonthAndTotal[customerId] = {
          user: { id: customerId, name: user.name },
          rewardPoints: {
            byMonth: {},
            total: initialValue,
          },
        }
      }

      const month = getMonthKeyFromDate(date)
      if (!distinctMonths.includes(month)) {
        distinctMonths.push(month)
      }

      if (!rewardsByUserInEachMonthAndTotal[customerId].rewardPoints.byMonth[month]) {
        rewardsByUserInEachMonthAndTotal[customerId].rewardPoints.byMonth[month] = 0
      }

      const points = rewardPointsCalculator.calculate(amount)
      rewardsByUserInEachMonthAndTotal[customerId].rewardPoints.byMonth[month] += points
      rewardsByUserInEachMonthAndTotal[customerId].rewardPoints.total += points
    }
  })

  return {
    rankingMonths: distinctMonths.sort().reverse(),
    records: Object.values(rewardsByUserInEachMonthAndTotal),
  }
}
