// Format big numbers greather then 1000000 in user frendly format
export const useFormatBigNumber = number => (number / 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 0 })
