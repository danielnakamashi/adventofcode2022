import fs from 'fs'
import path from 'path'

const input = fs
  .readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .slice(0, -1)

const grid = input.split('\n').map(line => line.split('').map(Number))

function getSceneScore(row: number, col: number, grid: number[][]): number {
  const height = grid[row][col]

  // North
  let scoreNorth = 0
  for (let rowComp = row - 1; rowComp >= 0; rowComp -= 1) {
    if (grid[rowComp][col] >= height) {
      scoreNorth += 1
      break
    }

    scoreNorth += 1
  }

  // South
  let scoreSouth = 0
  for (let rowComp = row + 1; rowComp < grid.length; rowComp += 1) {
    if (grid[rowComp][col] >= height) {
      scoreSouth += 1
      break
    }

    scoreSouth += 1
  }

  // East
  let scoreEast = 0
  for (let colComp = col + 1; colComp < grid[row].length; colComp += 1) {
    if (grid[row][colComp] >= height) {
      scoreEast += 1
      break
    }

    scoreEast += 1
  }

  // West
  let scoreWest = 0
  for (let colComp = col - 1; colComp >= 0; colComp -= 1) {
    if (grid[row][colComp] >= height) {
      scoreWest += 1
      break
    }

    scoreWest += 1
  }

  return scoreNorth * scoreSouth * scoreEast * scoreWest
}

let max = 0
for (let row = 0; row < grid.length; row += 1) {
  for (let col = 0; col < grid[row].length; col += 1) {
    const score = getSceneScore(row, col, grid)
    max = Math.max(score, max)
  }
}

console.log(max)
