import fs from 'fs'
import path from 'path'

const IS_TEST = false
const input = fs
  .readFileSync(path.join(__dirname, `./input${IS_TEST ? '_test' : ''}.txt`), {
    encoding: 'utf-8',
  })
  .slice(0, -1)

type Grid<T = number> = T[][]
type Distances = Record<string, number>

class Pos {
  #row: number
  #col: number

  constructor(row: number, col: number) {
    this.#row = row
    this.#col = col
  }

  get row() {
    return this.#row
  }

  get col() {
    return this.#col
  }

  toKey(): string {
    return JSON.stringify({ row: this.#row, col: this.#col })
  }

  toString(): string {
    return this.toKey()
  }

  isEqual(pos: Pos): boolean {
    return this.row === pos.row && this.col === pos.col
  }
}

function parseGrid(grid: Grid<string>): {
  grid: Grid
  initialPos: Pos
  finalPos: Pos
} {
  const numberGrid = grid.map(row => row.map(char => char.charCodeAt(0) - 96))

  let initialPos: Pos | null = null
  let finalPos: Pos | null = null

  for (let row = 0; row < numberGrid.length; row += 1) {
    for (let col = 0; col < numberGrid[row].length; col += 1) {
      if (numberGrid[row][col] === -13) {
        initialPos = new Pos(row, col)
      }
      if (numberGrid[row][col] === -27) {
        finalPos = new Pos(row, col)
      }
      if (initialPos && finalPos) {
        break
      }
    }
    if (initialPos && finalPos) {
      break
    }
  }

  numberGrid[initialPos!.row][initialPos!.col] = 1
  numberGrid[finalPos!.row][finalPos!.col] = 26

  return { grid: numberGrid, initialPos: initialPos!, finalPos: finalPos! }
}

function getAdjacentNodes(grid: Grid, pos: Pos): Pos[] {
  const value = grid[pos.row][pos.col]
  const adjacents: Pos[] = []

  adjacents.push(new Pos(pos.row - 1, pos.col))
  adjacents.push(new Pos(pos.row + 1, pos.col))
  adjacents.push(new Pos(pos.row, pos.col - 1))
  adjacents.push(new Pos(pos.row, pos.col + 1))

  return adjacents
    .filter(
      ({ row, col }) =>
        row >= 0 && row < grid.length && col >= 0 && col < grid[row].length
    )
    .filter(pos => {
      const adjacentValue = grid[pos.row][pos.col]

      return adjacentValue - value <= 1
    })
}

function getShortestPath(
  grid: Grid,
  initialPos: Pos[],
  finalPos: Pos
): number | null {
  const visited: Set<string> = new Set()
  const queue: Array<[Pos, number]> = initialPos.map(pos => [pos, 0])

  while (queue.length > 0) {
    const [pos, step] = queue.pop() as [Pos, number]

    if (pos.isEqual(finalPos)) {
      return step
    }

    if (visited.has(pos.toKey())) {
      continue
    }

    visited.add(pos.toKey())

    const adjacents = getAdjacentNodes(grid, pos)
    for (const adjacent of adjacents) {
      queue.unshift([adjacent, step + 1])
    }
  }

  return null
}

function main(input: string): void {
  const gridStr = input.split('\n').map(line => line.split(''))
  const { grid, initialPos, finalPos } = parseGrid(gridStr)

  const startPoints = []
  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[row].length; col += 1) {
      if (grid[row][col] === 1) {
        startPoints.push(new Pos(row, col))
      }
    }
  }
  const shortestPath = getShortestPath(grid, startPoints, finalPos)

  console.log(shortestPath)
}

main(input)
