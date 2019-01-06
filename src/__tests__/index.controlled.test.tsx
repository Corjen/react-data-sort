import * as React from 'react'
import DataSort from '../react-data-sort'
import { shallow } from 'enzyme'

const data = [{ id: 1, name: 'b' }, { id: 2, name: 'a' }, { id: 3, name: 'c' }]

test('Pagination', () => {
  let renderArgs: any = renderAndReturnArgs()
  expect(renderArgs).toMatchSnapshot()

  // Render with activePage prop
  renderArgs = renderAndReturnArgs({ itemsPerPage: 1, activePage: 1 })
  expect(renderArgs.activePage).toEqual(1)
  expect(renderArgs.data).toEqual([data[1]])

  renderArgs = renderAndReturnArgs({ itemsPerPage: 1, activePage: 2 })
  expect(renderArgs.activePage).toEqual(2)
})

test('Direction & sortBy', () => {
  let renderArgs: any = renderAndReturnArgs({ sortBy: 'id', direction: 'desc' })
  expect(renderArgs.sortBy).toEqual('id')
  expect(renderArgs.direction).toEqual('desc')
  expect(renderArgs.data).toEqual([data[2], data[1], data[0]])

  renderArgs = renderAndReturnArgs({ sortBy: 'name' })
  expect(renderArgs.sortBy).toEqual('name')
  expect(renderArgs.direction).toEqual('asc')
  expect(renderArgs.data).toEqual([data[1], data[0], data[2]])
})

test('Search query', () => {
  let searchQuery = 'b'
  let renderArgs: any = renderAndReturnArgs({ searchQuery, searchInKeys: ['name'] })
  expect(renderArgs.searchQuery).toEqual(searchQuery)
  expect(renderArgs.data).toEqual([data[0]])

  searchQuery = ''
  renderArgs = renderAndReturnArgs({ searchQuery })
  expect(renderArgs.searchQuery).toEqual(searchQuery)
  expect(renderArgs.data).toEqual(data)
})

function renderAndReturnArgs(props = {}) {
  let renderArgs
  const renderSpy = jest.fn(args => {
    renderArgs = { ...args }
    return null
  })
  shallow(<DataSort {...props} paginate data={data} render={renderSpy} />)
  return renderArgs
}
