export const getDate = (multiplier = 1) => {
  return new Date(Date.now() - 86400000 * multiplier).toLocaleString();
};

export const getTimestamp = (multiplier = 1) => {
  return Date.now() - 86400000 * multiplier;
};

export const INITIAL_TRANSACTIONS = [
    {
      id: 1,
      amount: 500,
      type: 'Airtime Purchase',
      date: getDate(2),
      status: 'used',
      timestamp: getTimestamp(2)
    },
    {
      id: 2,
      amount: 1000,
      type: 'Airtime Purchase',
      date: getDate(),
      status: 'used',
      timestamp: getTimestamp()
    },
    {
      id: 3,
      amount: 200,
      type: 'Airtime Purchase',
      date: getDate(5),
      status: 'unused',
      timestamp: getTimestamp(5)
    },
    {
      id: 4,
      amount: 750,
      type: 'Airtime Purchase',
      date: getDate(12),
      status: 'unused',
      timestamp: getTimestamp(12)
    }
  ]


export interface Transaction {
  id: number;
  amount: number;
  type: string;
  date: string;
  status: string;
  timestamp: number;
}