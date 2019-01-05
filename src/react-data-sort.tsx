import * as React from 'react'
import * as PropTypes from 'prop-types'
import matchSorter from 'match-sorter'
import { calculatePages, sortData, paginateData } from './utils'

type Direction = 'asc' | 'desc'

interface RenderProp {
  data: any[]
  activePage: number
  pages: number
  sortBy: string
  direction: string
  searchQuery: string
  toggleDirection: () => void
  reset: () => void
  prevPage: () => void
  nextPage: () => void
  goToPage: (activePage: number) => void
  setDirection: (direction: Direction) => void
  setSortBy: (sortBy: string) => void
  search: (value: string) => void
}

interface DataSortProps {
  data: any[]
  render: ({  }: RenderProp) => React.ReactNode
  paginate?: boolean
  sortBy?: string
  direction?: string
  itemsPerPage?: number
  activePage?: number
  defaultSortBy?: string
  defaultDirection?: string
  defaultActivePage?: number
  searchQuery?: string
  searchInKeys?: any[]
}

interface DataSortState {
  sortBy: string | null
  direction: string
  pages: number | null
  activePage: number
  data: any[]
  searchQuery: string
}

class DataSort extends React.Component<DataSortProps, DataSortState> {
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
    itemsPerPage: 10,
    paginate: false
  }

  state: DataSortState = {
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

  goToPage = (activePage: number) => {
    if (this.props.paginate === null) {
      return
    }
    if (typeof activePage !== 'number' || activePage < 0 || activePage > this.state.pages) {
      return
    }
    this.setState({ activePage })
  }

  setSortBy = (sortBy: string) => {
    this.setState({ sortBy })
  }

  setDirection = (direction: Direction) => {
    if (direction === 'asc' || direction === 'desc') {
      this.setState({ direction })
    }
  }

  toggleDirection = () => {
    this.setState({
      direction: this.state.direction === 'asc' ? 'desc' : 'asc'
    })
  }

  /**
   * Search dataset with given query
   *
   * @param value: string
   */
  search = (value: string) => {
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
