import moment from 'moment'

// Format date base on the UI needs
export const useDateTime = (date, format) => moment(date).format(format) // 'l LTS' | 'MMM D'
export const useRelativeDateTime = date => moment(date).fromNow()