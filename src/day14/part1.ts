import fs from 'fs'
import path from 'path'

type Position = `${number},${number}`
type Grid = Set<Position>

const IS_TEST = process.argv.length === 3 && process.argv[2] === '--test'
const input = fs
  .readFileSync(path.join(__dirname, `./input${IS_TEST ? '_test' : ''}.txt`), {
    encoding: 'utf-8',
  })
  .slice(0, -1)

class SandDrop {
  #grid: Grid
  #minX: number
  #maxX: number
  #minY: number
  #maxY: number

  constructor(input: string) {
    this.#grid = new Set<Position>()
    this.#minX = Infinity
    this.#maxX = -Infinity
    this.#minY = Infinity
    this.#maxY = -Infinity

    const rockPaths = this.#mapRockPaths(input)
    this.#makeGrid(rockPaths)
    this.#getEdges()
  }

  #mapRockPaths(input: string): string[][] {
    return input.split('\n').map(path => path.split(' -> '))
  }

  #makeGrid(rockPaths: string[][]) {
    rockPaths.forEach(path => {
      path.reduce((prev, next) => {
        const [endX, endY] = next.split(',').map(Number)
        let [startX, startY] = prev.split(',').map(Number)

        while (startX !== endX || startY !== endY) {
          this.#grid.add(`${startX},${startY}`)

          if (startX < endX) {
            startX += 1
          } else if (startX > endX) {
            startX -= 1
          }

          if (startY < endY) {
            startY += 1
          } else if (startY > endY) {
            startY -= 1
          }
        }

        this.#grid.add(`${endX},${endY}`)

        return next
      })
    })
  }

  #getEdges() {
    this.#grid.forEach(point => {
      const [x, y] = point.split(',').map(Number)
      this.#maxX = Math.max(x, this.#maxX)
      this.#maxY = Math.max(y, this.#maxY)
      this.#minX = Math.min(x, this.#minX)
      this.#minY = Math.min(y, this.#minY)
    })
  }

  printGrid() {
    let gridStr = ''
    for (let y = 0; y <= this.#maxY; y += 1) {
      for (let x = this.#minX; x <= this.#maxX; x += 1) {
        gridStr += this.#grid.has(`${x},${y}`) ? '#' : '.'
      }
      gridStr += '\n'
    }

    console.log(gridStr)
  }

  startSandDrop(fromPosition: Position) {
    this.#dropSand()
  }

  #getNextPosition(pos: Position): Position | null {
    const [x, y] = pos.split(',').map(Number)

    let newPos: Position = `${x},${y + 1}`
    if (!this.#grid.has(newPos)) {
      return newPos
    }
    newPos = `${x - 1},${y + 1}`
    if (!this.#grid.has(newPos)) {
      return newPos
    }
    newPos = `${x + 1},${y + 1}`
    if (!this.#grid.has(newPos)) {
      return newPos
    }

    return null
  }

  #dropSand(pos: Position) {
    let nextPos = pos
    while (!this.#grid.has(nextPos)) {
      const [x, y] = nextPos.split(',').map(Number)
      nextPos = `${x},${y + 1}`
    }
  }
}

function main(input: string) {
  const sandDrop = new SandDrop(input)
  sandDrop.printGrid()
}

main(input)
