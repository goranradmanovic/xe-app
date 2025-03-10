import moment from 'moment'

// Format date base on the UI needs
export const useDateChart = date => moment(date).format('MMM D')
export const useDateTime = date => moment(date).format('l LTS')
export const useRelativeDateTime = date => moment(date).fromNow()