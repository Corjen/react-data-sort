import * as React from 'react'
import Datasort from 'react-data-sort'
import tableData from './data'

const DataTable = () => {
  return (
    <Datasort
      data={tableData}
      defaultSortBy="id"
      searchInKeys={['name']}
      paginate
      render={({ data, setSortBy, sortBy, direction, activePage, toggleDirection, goToPage, nextPage, prevPage, pages, search }) => {
        return (
          <div style={{ maxWidth: 500 }}>
            <Search search={search} />
            <table
              cellPadding={2}
              style={{
                width: '100%'
              }}
            >
              <TableHead setSortBy={setSortBy} sortBy={sortBy} direction={direction} toggleDirection={toggleDirection} />
              <TableBody data={data} />
            </table>
            <Flex style={{ justifyContent: 'space-between' }}>
              <GoToPage goToPage={goToPage} pages={pages} />
              <PageIndicator pages={pages} activePage={activePage} />
              <Navigation activePage={activePage} goToPage={goToPage} nextPage={nextPage} prevPage={prevPage} pages={pages} />
            </Flex>
          </div>
        )
      }}
    />
  )
}

export default DataTable

function Search({ search }: any) {
  return (
    <div>
      Search
      <input onChange={e => search(e.target.value)} />
    </div>
  )
}

function TableHead({ setSortBy, sortBy, direction, toggleDirection }: any) {
  const columns = [{ key: 'id', title: 'ID' }, { key: 'name', title: 'Name' }, { key: 'email', title: 'Email' }]
  const items = columns.map(({ key, title }) => {
    const active = key === sortBy
    return (
      <HeadToggle
        key={key}
        active={active}
        onClick={() => {
          if (active) {
            toggleDirection()
          }
          setSortBy(key)
        }}
      >
        {title} {active ? (direction === 'asc' ? '▲' : '▼') : null}
      </HeadToggle>
    )
  })
  return (
    <thead>
      <tr>{items}</tr>
    </thead>
  )
}

function HeadToggle({ children, active, onClick }: any) {
  return (
    <td onClick={onClick} style={{ fontWeight: active ? 'bold' : 'normal', cursor: 'pointer' }}>
      {children}
    </td>
  )
}

function TableBody({ data }: any) {
  return (
    <tbody>
      {data.map(({ id, name, email }: any) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
        </tr>
      ))}
    </tbody>
  )
}

function Flex({ children, style }: any) {
  return <div style={{ display: 'flex', ...style }}>{children}</div>
}

function GoToPage({ goToPage, pages }: any) {
  const options = []
  for (let i = 0; i < pages; i++) {
    options.push(
      <option value={i} key={i}>
        {i + 1}
      </option>
    )
  }
  return (
    <div>
      Go to page <select onChange={e => goToPage(parseInt(e.target.value))}>{options}</select>
    </div>
  )
}

function Navigation({ activePage, goToPage, nextPage, prevPage, pages }: any) {
  return (
    <Flex>
      <button disabled={activePage === 0} onClick={() => goToPage(0)}>
        {'<<'}
      </button>
      <button disabled={activePage === 0} onClick={prevPage}>
        {'<'}
      </button>

      <button disabled={activePage === pages - 1} onClick={nextPage}>
        {'>'}
      </button>
      <button disabled={activePage === pages - 1} onClick={() => goToPage(pages - 1)}>
        {'>>'}
      </button>
    </Flex>
  )
}

function PageIndicator({ pages, activePage }: any) {
  return (
    <div>
      <b>{activePage + 1}</b> / {pages}
    </div>
  )
}
