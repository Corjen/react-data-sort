import sortBy from 'lodash.sortby'

export const calculatePages = (items, itemsPerPage) => {
  if (typeof items !== 'number' || typeof itemsPerPage !== 'number') {
    throw new Error('items and itemsPerPage should both be a number')
  }
  return Math.ceil(items / itemsPerPage)
}

export const sortData = (data, key, direction = 'asc') => {
  const sorted = sortBy(data, key)
  return direction === 'desc' ? sorted.reverse() : sorted
}

export const paginateData = (data, activePage, itemsPerPage) => {
  const from = activePage * itemsPerPage
  const to = from + itemsPerPage
  if (typeof activePage !== 'number' || typeof itemsPerPage !== 'number') {
    throw new Error('activePage and itemsPerPage should both be a number')
  }
  return data.slice(from, to)
}
