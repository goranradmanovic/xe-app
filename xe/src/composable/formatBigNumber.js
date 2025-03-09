export const useFormatBigNumber = number => (number / 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 0 })
