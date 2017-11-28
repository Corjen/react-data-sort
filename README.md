# React data sort

A simple react component that helps you sort and paginate a list of data.

## Badges here

# The problem

You want to display a custom set of data in a table or list and want to be able to sort and/or paginate it. You also want to have freedom of
styling and a simple API.

# This solution

Components with a (render prop)[https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce] like [Downshift](downshift) and React Router's
[Route](https://reacttraining.com/react-router/web/api/Route) are gaining popularity. The render prop pattern gives you maximum flexibility
in the way you render and style your components because the render prop itself doens't render anything.

I've made this component because I was looking for a React table component that would give me as much control as possible over rendering and
styling. I couldn't find it, so I decided to build something myself. This is my first open source React Component, any feedback or
contributions are very welcome!

# Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Props](#props)
* [Render prop function](#render-prop-function)
* [Examples](#examples)
* [Todo](#todo)
* [License](#license)

# [Installation](#installation)

This modules is distributed via [npm](https://www.npmjs.com/package/react-data-sort). You can install it with npm:

```
npm install --save react-data-sort
```

This package has `react` and `prop-types` as [peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies/). Make sure to install
them if you haven't.

# [Usage](usage)

```javascript
import Datasort from 'react-data-sort'

const tableData = [{ id: 1, name: 'b', id: 2, name: 'c', id: 3, name: 'a' }]

function App() {
  return (
    <Datasort
      data={tableData}
      paginate
      render={({ data }) => (
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    />
  )
}

export default App
```

By default, it will return the data in the same order that you've given it. The above code will result in this table:

| ID  | Name |
| --- | ---- |
| 1   | b    |
| 2   | c    |
| 3   | a    |

# [Props](#props)

## data

> `array` | defaults to `[]` An array of data that you want to render

## defaultDirection

> `string` | defaults to `desc` | can be `asc' or`desc` This is the direction in which the data is sorted by default.

## defaultSortBy

> `string` | defaults to `null` | can be null or an object key in your data array This is the key by which your data is sorted.

## itemsPerPage

> `number` | defaults to `10` The number of items to show on one page. Only works of `paginate` prop is `true`.

## paginate

> `boolean` | defaults to `false`

Enables pagination functionality and slices your data to the current page.

# [Controlled vs Uncontrolled](#controlled-vs-uncontrolled)

The internal state manages `direction`, `sortBy` and `activePage`. In some cases, you want to control that state outside the component, for
example if you use `redux` or `mobx` to manage your state. You can set `direction`, `sortBy` and `active` as props, thus making that part of
the state 'controlled'.

# [Render Prop Function](#render-prop-function)

The render prop expects a function and doesn't render anything. It's argument is an object though, with the internal state and a couple of
actions.

```javascript
<Datasort
      data={tableData}
      paginate
      render={({
         data,
         activePage,
         pages,
         sortBy,
         // etc..
        }) => (
        // Render jsx stuff here
      )}
    />
```

## actions

You can change the internal state with these actions.

| property        | type                          | description                                            |
| --------------- | ----------------------------- | ------------------------------------------------------ |
| toggleDirection | `function()`                  | toggle the direction from `asc` to `desc` or viceversa |
| setDirection    | `function(direction: string)` | set the direction to `asc` or `desc`                   |
| prevPage        | `function()`                  | go to the previous page (only if `paginate` is true)   |
| nextPage        | `function()`                  | go to the next page (only if `paginate` is true)       |
| gotToPage       | `function(index: number)`     | go to a specific page                                  |
| setSortBy       | `function(key: string)`       | set the key to sort the data by                        |
| reset           | `function()`                  | reset to the initial state                             |

## state

These are the internal state values

| property   | type              | description                                       |
| ---------- | ----------------- | ------------------------------------------------- |
| activePage | `number`          | the current active page                           |
| pages      | `number`          | the total amount of pages The current active page |
| sortBy     | `string` / `null` | the current key where the data is sorted by       |
| direction  | `string`          | the current direction where the data is sorted by |

# [Examples](#examples)

# [TODO](#todo)

* UMD build
* Search/filter
* Change the name to something fancier?

# [License](#license)

MIT
