import sortBy from 'lodash.sortby'

export const calculatePages = (items: number, itemsPerPage: number) => {
  return Math.ceil(items / itemsPerPage)
}

export const sortData = (data: any[], key: string, direction = 'asc') => {
  const sorted = sortBy(data, key)
  return direction === 'desc' ? sorted.reverse() : sorted
}

export const paginateData = (data: any[], activePage: number, itemsPerPage: number) => {
  const from = activePage * itemsPerPage
  const to = from + itemsPerPage
  return data.slice(from, to)
}
