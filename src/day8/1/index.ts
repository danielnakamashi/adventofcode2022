import fs from 'fs'
import path from 'path'

const input = fs
  .readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .slice(0, -1)

const grid = input.split('\n').map(line => line.split('').map(Number))

function isVisible({
  row,
  col,
  grid,
}: {
  row: number
  col: number
  grid: number[][]
}): boolean {
  const height = grid[row][col]

  // From north
  let visibleFromNorth = true
  for (let rowComp = 0; rowComp < row; rowComp += 1) {
    if (height <= grid[rowComp][col]) {
      visibleFromNorth = false
      break
    }
  }

  if (visibleFromNorth) {
    return true
  }

  // From south
  let visibleFromSouth = true
  for (let rowComp = row + 1; rowComp < grid.length; rowComp += 1) {
    if (height <= grid[rowComp][col]) {
      visibleFromSouth = false
      break
    }
  }

  if (visibleFromSouth) {
    return true
  }

  // From west
  let visibleFromWest = true
  for (let colComp = 0; colComp < col; colComp += 1) {
    if (height <= grid[row][colComp]) {
      visibleFromWest = false
      break
    }
  }

  if (visibleFromWest) {
    return true
  }

  // From east
  let visibleFromEast = true
  for (let colComp = col + 1; colComp < grid[row].length; colComp += 1) {
    if (height <= grid[row][colComp]) {
      visibleFromEast = false
      break
    }
  }

  if (visibleFromEast) {
    return true
  }

  return false
  // console.log({
  //   row,
  //   col,
  //   height,
  //   visibleFromNorth,
  //   visibleFromSouth,
  //   visibleFromWest,
  //   visibleFromEast,
  // })
}

let countVisible = 0
for (let row = 1; row < grid.length - 1; row += 1) {
  for (let col = 1; col < grid[row].length - 1; col += 1) {
    if (isVisible({ row, col, grid })) {
      countVisible += 1
    }
  }
}

const row = grid.length
const col = grid[0].length

countVisible += col * 2 + 2 * (row - 2)

console.log(countVisible)
