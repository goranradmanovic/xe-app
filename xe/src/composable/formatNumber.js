// Format big number -> 1000000 -> 1,000,000 for the UI
export const useFormatNumber = number => new Intl.NumberFormat().format(number)