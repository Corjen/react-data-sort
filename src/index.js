import React from 'react'
import PropTypes from 'prop-types'
import matchSorter from 'match-sorter'
import { calculatePages, sortData, paginateData } from './utils'

class DataSort extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    render: PropTypes.func,
    paginate: PropTypes.bool,
    sortBy: PropTypes.string,
    direction: PropTypes.string,
    itemsPerPage: PropTypes.number,
    activePage: PropTypes.number,
    defaultSortBy: PropTypes.string,
    defaultDirection: PropTypes.string,
    searchQuery: PropTypes.string,
    searchInKeys: PropTypes.array
  }
  static defaultProps = {
    data: [],
    itemsPerPage: 10,
    paginate: false
  }
  state = {
    sortBy: this.props.defaultSortBy || null,
    direction: this.props.defaultDirection || 'asc',
    pages: null,
    activePage: this.props.defaultActivePage || 0,
    data: [],
    searchQuery: ''
  }
  componentDidMount() {
    const { itemsPerPage, paginate, data } = this.props
    if (paginate) {
      this.setState({ pages: calculatePages(data.length, itemsPerPage) })
    }
  }
  isPaginationControlled() {
    return typeof this.props.activePage !== 'undefined'
  }
  isSortByControlled() {
    return typeof this.props.sortBy !== 'undefined'
  }
  isDirectionControlled() {
    return typeof this.props.direction !== 'undefined'
  }
  isSearchControlled() {
    return typeof this.props.searchQuery !== 'undefined'
  }
  reset = () => {
    this.setState({
      sortBy: null,
      direction: 'asc',
      activePage: 0
    })
  }
  prevPage = () => {
    if (this.props.paginate === null) {
      return
    }
    const { activePage } = this.isPaginationControlled() ? this.props : this.state
    if (activePage === 0) {
      return
    }
    this.goToPage(activePage - 1)
  }
  nextPage = () => {
    if (this.props.paginate === null) {
      return
    }
    const { activePage } = this.isPaginationControlled() ? this.props : this.state
    const { pages } = this.state
    if (activePage + 1 < pages) {
      this.goToPage(activePage + 1)
    }
  }
  goToPage = activePage => {
    if (this.props.paginate === null) {
      return
    }
    if (typeof activePage !== 'number' || activePage < 0 || activePage > this.state.pages) {
      return
    }
    this.setState({ activePage })
  }
  setSortBy = sortBy => {
    this.setState({ sortBy })
  }

  setDirection = direction => {
    if (direction === 'asc' || direction === 'desc') {
      this.setState({ direction })
    }
  }
  toggleDirection = () => {
    this.setState({
      direction: this.state.direction === 'asc' ? 'desc' : 'asc'
    })
  }
  search = value => {
    this.setState({ searchQuery: value })
  }
  render() {
    const { render, paginate, itemsPerPage, data } = this.props
    const { activePage } = this.isPaginationControlled() ? this.props : this.state
    const { sortBy } = this.isSortByControlled() ? this.props : this.state
    const { direction } = this.isDirectionControlled() ? this.props : this.state
    const { searchQuery } = this.isSearchControlled() ? this.props : this.state
    const { pages } = this.state
    const keys = this.props.searchInKeys || (data && data.length) ? Object.keys(data[0]) : []
    console.log({ keys })
    // Search & sort data
    const searched = searchQuery === '' ? data : matchSorter(data, searchQuery, { keys })
    const sorted = sortBy === null ? searched : sortData(searched, sortBy, direction)

    return typeof render !== 'function'
      ? null
      : render({
          data: paginate ? paginateData(sorted, activePage, itemsPerPage) : sorted,
          activePage,
          pages,
          sortBy,
          direction,
          searchQuery,
          toggleDirection: this.toggleDirection,
          reset: this.reset,
          prevPage: this.prevPage,
          nextPage: this.nextPage,
          goToPage: this.goToPage,
          setDirection: this.setDirection,
          setSortBy: this.setSortBy,
          search: this.search
        })
  }
}

export default DataSort
