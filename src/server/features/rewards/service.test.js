const assert = require('assert')
const calculateRewards = require('./service')

describe('calculateRewards', () => {
  const tiers = [
    { minAmount: 0, maxAmount: 50, multiplier: 1 },
    { minAmount: 50, maxAmount: 100, multiplier: 2 },
    { minAmount: 100, maxAmount: null, multiplier: 3 },
  ]

  const users = {
    1: { name: 'Alice' },
    2: { name: 'Bob' },
  }

  const transactions = [
    { customerId: 1, date: new Date('2022-01-01'), amount: 25 },
    { customerId: 1, date: new Date('2022-01-15'), amount: 75 },
    { customerId: 2, date: new Date('2022-01-31'), amount: 200 },
  ]

  it('should calculate reward points for a single transaction', () => {
    const result = calculateRewards([transactions[0]], users, tiers)
    assert.deepStrictEqual(result, {
      rankingMonths: ['2022-01'],
      records: [
        {
          user: { id: 1, name: 'Alice' },
          rewardPoints: { byMonth: { '2022-01': 25 }, total: 25 },
        },
      ],
    })
  })
  it('should calculate reward points for multiple transactions', () => {
    const result = calculateRewards(transactions, users, tiers)
    assert.deepStrictEqual(result, {
      rankingMonths: ['2022-01'],
      records: [
        {
          user: { id: 1, name: 'Alice' },
          rewardPoints: { byMonth: { '2022-01': 125 }, total: 125 },
        },
        {
          user: { id: 2, name: 'Bob' },
          rewardPoints: { byMonth: { '2022-01': 450 }, total: 450 },
        },
      ],
    })
  })

  it('should handle missing users', () => {
    const result = calculateRewards(
      [{ customerId: 3, date: new Date(), amount: 100 }],
      users,
      tiers,
    )
    assert.deepStrictEqual(result, {
      rankingMonths: [],
      records: [],
    })
  })

  it('should handle empty transactions', () => {
    const result = calculateRewards([], users, tiers)
    assert.deepStrictEqual(result, {
      rankingMonths: [],
      records: [],
    })
  })

  it('should handle empty tiers', () => {
    const result = calculateRewards(transactions, users, [])
    assert.deepStrictEqual(result, {
      rankingMonths: ['2022-01'],
      records: [
        {
          user: { id: 1, name: 'Alice' },
          rewardPoints: { byMonth: { '2022-01': 0 }, total: 0 },
        },
        {
          user: { id: 2, name: 'Bob' },
          rewardPoints: { byMonth: { '2022-01': 0 }, total: 0 },
        },
      ],
    })
  })

  it('should match the doc example', () => {
    const result = calculateRewards(
      [{ customerId: 1, date: new Date('2022-01-01'), amount: 120 }],
      {
        1: { name: 'Alice' },
      },
      [
        { minAmount: 50, maxAmount: 100, multiplier: 1 },
        { minAmount: 100, maxAmount: null, multiplier: 2 },
      ],
    )
    assert.deepStrictEqual(result, {
      rankingMonths: ['2022-01'],
      records: [
        {
          user: { id: 1, name: 'Alice' },
          rewardPoints: { byMonth: { '2022-01': 90 }, total: 90 },
        },
      ],
    })
  })
})
