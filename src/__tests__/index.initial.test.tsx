import React from 'react'
import DataSort from '../react-data-sort'
import { shallow } from 'enzyme'

const data = [{ id: 1, name: 'b' }, { id: 2, name: 'a' }, { id: 3, name: 'c' }]

test('initialState', () => {
  const wrapper = shallow(<DataSort data={data} render={() => null} />)
  expect(wrapper.state()).toMatchSnapshot()
})

test('pages should be null if pagination is disabled', () => {
  const wrapper = shallow(<DataSort data={data} render={() => null} />)
  expect(wrapper.state('pages')).toBeNull()
})

test('pages should be set if pagination is enabled', () => {
  const wrapper = shallow(<DataSort data={data} paginate render={() => null} />)
  expect(wrapper.state('pages')).toEqual(1)
})

test('defaultSortBy should set the sortBy state', () => {
  const wrapper = shallow(<DataSort data={data} defaultSortBy="id" render={() => null} />)
  expect(wrapper.state('sortBy')).toEqual('id')
})

test('defaultDirection should set the direction', () => {
  const wrapper = shallow(<DataSort data={data} defaultDirection="desc" render={() => null} />)
  expect(wrapper.state('direction')).toEqual('desc')
})

test('pagination should be uncontrolled', () => {
  const wrapper: any = shallow(<DataSort data={data} />)
  const instance = wrapper.instance()
  expect(instance.isPaginationControlled()).toBeFalsy()
  // const instance = shallow(<DataSort data={data} />).instance()
  // expect(instance.isPaginationControlled()).toBeFalsy()
})

test('pagination should be controlled', () => {
  const instance: any = shallow(<DataSort data={data} activePage={0} />).instance()
  expect(instance.isPaginationControlled()).toBeTruthy()
})

test('sortBy should be uncontrolled', () => {
  const instance: any = shallow(<DataSort data={data} />).instance()
  expect(instance.isSortByControlled()).toBeFalsy()
})

test('sortBy should be controlled', () => {
  const instance: any = shallow(<DataSort data={data} sortBy="id" />).instance()
  expect(instance.isSortByControlled()).toBeTruthy()
})

test('direction should be uncontrolled', () => {
  const instance: any = shallow(<DataSort data={data} />).instance()
  expect(instance.isDirectionControlled()).toBeFalsy()
})

test('direction should be controlled', () => {
  const instance: any = shallow(<DataSort data={data} direction="asc" />).instance()
  expect(instance.isDirectionControlled()).toBeTruthy()
})

test('search should be uncontrolled', () => {
  const instance: any = shallow(<DataSort data={data} />).instance()
  expect(instance.isSearchControlled()).toBeFalsy()
})

test('search should be controlled', () => {
  const instance: any = shallow(<DataSort data={data} searchQuery="test" />).instance()
  expect(instance.isSearchControlled()).toBeTruthy()
})
