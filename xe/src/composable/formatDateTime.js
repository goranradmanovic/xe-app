import moment from 'moment'

export const useDateChart = date => moment(date).format('MMM D')
export const useDateTime = date => moment(date).format('l LTS')
export const useRelativeDateTime = date => moment(date).fromNow()