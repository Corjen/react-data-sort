import React from 'react'
import DataSort from '../'
import { shallow } from 'enzyme'
const data = [{ id: 1, name: 'b' }, { id: 2, name: 'a' }, { id: 3, name: 'c' }]

test('Pagination', () => {
  let renderArgs
  const renderSpy = jest.fn(args => {
    renderArgs = { ...args }
    return null
  })
  shallow(<DataSort data={data} itemsPerPage={1} paginate render={renderSpy} />)

  // Expect some initial defaults
  expect(renderArgs).toMatchSnapshot()

  // Go to a none existing page
  renderArgs.goToPage(renderArgs.pages + 1)
  expect(renderArgs.activePage).toEqual(0)

  // Go to an existing page
  renderArgs.goToPage(renderArgs.pages - 1)
  expect(renderArgs.activePage).toEqual(2)

  // Reset
  renderArgs.goToPage(0)

  // Go to the next page
  renderArgs.nextPage()
  expect(renderArgs.activePage).toEqual(1)

  // Should stay on the same page if next page doesn't exist
  renderArgs.goToPage(2)
  renderArgs.nextPage()
  expect(renderArgs.activePage).toEqual(2)

  // Should stay on the same page if next page doesn't exist
  renderArgs.goToPage(0)
  renderArgs.prevPage()
  expect(renderArgs.activePage).toEqual(0)
  renderArgs.goToPage(2)
  renderArgs.prevPage()
  expect(renderArgs.activePage).toEqual(1)
})

test('Set & toggle direction', () => {
  let renderArgs
  const renderSpy = jest.fn(args => {
    renderArgs = { ...args }
    return null
  })
  shallow(<DataSort data={data} paginate render={renderSpy} />)

  // Should keep the same direction if input is invalid
  renderArgs.setDirection('invalid')
  expect(renderArgs.direction).toEqual('asc')

  // Set to desc
  renderArgs.setDirection('desc')
  expect(renderArgs.direction).toEqual('desc')

  // Set to asc
  renderArgs.setDirection('asc')
  expect(renderArgs.direction).toEqual('asc')

  // Toggle direction
  renderArgs.toggleDirection()
  expect(renderArgs.direction).toEqual('desc')
  renderArgs.toggleDirection()
  expect(renderArgs.direction).toEqual('asc')

  // Validate data by direction
  renderArgs.setSortBy('id') // We need to set this, or we won't know what to sort
  expect(renderArgs.data).toEqual(data)
  renderArgs.toggleDirection()
  expect(renderArgs.data).toEqual(data.reverse())
})

test('Sort by & direction', () => {
  let renderArgs
  const renderSpy = jest.fn(args => {
    renderArgs = { ...args }
    return null
  })
  shallow(<DataSort data={data} paginate render={renderSpy} />)

  // Default is null
  expect(renderArgs.sortBy).toBeNull()
  renderArgs.setSortBy('name')
  expect(renderArgs.sortBy).toEqual('name')
  expect(renderArgs.data).toEqual([data[1], data[2], data[0]])
  // SortBy should stay the same if direction changes
  renderArgs.toggleDirection()
  expect(renderArgs.sortBy).toEqual('name')
  expect(renderArgs.data).toEqual([data[0], data[2], data[1]])
})

test('Reset', () => {
  let renderArgs
  const renderSpy = jest.fn(args => {
    renderArgs = { ...args }
    return null
  })
  shallow(<DataSort data={data} paginate render={renderSpy} />)
  renderArgs.toggleDirection()
  renderArgs.nextPage()
  renderArgs.reset()
  expect(renderArgs.activePage).toEqual(0)
  expect(renderArgs.direction).toEqual('asc')
  expect(renderArgs.sortBy).toBeNull()
})
