import moment from 'moment'

export const useDateTime = date => moment(date).format('l LTS')
export const useRelativeDateTime = date => moment(date).fromNow()