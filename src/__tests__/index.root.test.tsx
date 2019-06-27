import React from 'react'
import DataSort from '../react-data-sort'
import { mount } from 'enzyme'

const data = [{ id: 1, name: 'b' }, { id: 2, name: 'a' }, { id: 3, name: 'c' }]

test('render nothing', () => {
  const Component = () => <DataSort data={data} />
  expect(mount(<Component />).html()).toEqual('')
})

test('render prop is null, then render null', () => {
  const Component = () => <DataSort data={data} render={() => null} />
  expect(mount(<Component />).html()).toEqual('')
})

test('render fine', () => {
  const Test = () => <div>test</div>
  const Component = () => <DataSort data={data} render={() => <Test />} />
  expect(() => mount(<Component />)).not.toThrow()
})
