import React from 'react'
import DataSort from '../'
import { mount } from 'enzyme'

test('render nothing', () => {
  const Component = () => <DataSort />
  expect(mount(<Component />).html()).toBe(null)
})

test('render prop is null, then render null', () => {
  const Component = () => <DataSort render={() => null} />
  expect(mount(<Component />).html()).toBe(null)
})

test('render fine', () => {
  const Test = () => <div>test</div>
  const Component = () => <DataSort render={() => <Test />} />
  expect(() => mount(<Component />)).not.toThrow()
})
