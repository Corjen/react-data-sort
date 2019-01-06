import { calculatePages, sortData, paginateData } from '../utils'

describe('calculatePages', () => {
  it('should calculate the right amount of pages', () => {
    expect(calculatePages(10, 2)).toEqual(5)
    expect(calculatePages(20, 4)).toEqual(5)
    expect(calculatePages(10, 3)).toEqual(4)
    expect(calculatePages(1, 10)).toEqual(1)
  })
})

describe('sortData', () => {
  const data = [{ id: 2, name: 'b' }, { id: 1, name: 'c' }, { id: 3, name: 'a' }]

  it('should order the data by id', () => {
    expect(sortData(data, 'id')).toEqual([data[1], data[0], data[2]])
    expect(sortData(data, 'id', 'asc')).toEqual([data[1], data[0], data[2]])
  })

  it('should order the data by id in reversed order', () => {
    expect(sortData(data, 'id', 'desc')).toEqual([data[2], data[0], data[1]])
  })

  it('should order the data by name', () => {
    expect(sortData(data, 'name')).toEqual([data[2], data[0], data[1]])
  })
  it('should order the data by name in reversed order', () => {
    expect(sortData(data, 'name', 'desc')).toEqual([data[1], data[0], data[2]])
  })
  it('should return the data if the key does not exist', () => {
    expect(sortData(data, 'key')).toEqual(data)
  })
})

describe('paginateData', () => {
  const data = [{ id: 2 }, { id: 1 }, { id: 3 }]
  it('should return the right slice', () => {
    expect(paginateData(data, 0, 1)).toEqual([data[0]])
    expect(paginateData(data, 2, 1)).toEqual([data[2]])
    expect(paginateData(data, 0, 2)).toEqual([data[0], data[1]])
  })
  it('should return the unsliced data', () => {
    expect(paginateData(data, 0, 1)).toEqual([data[0]])
  })
})
