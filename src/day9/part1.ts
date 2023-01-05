import fs from 'fs'
import path from 'path'

const IS_TEST = false
const input: string = fs
  .readFileSync(path.join(__dirname, `./input${IS_TEST ? '_test' : ''}.txt`), {
    encoding: 'utf-8',
  })
  .slice(0, -1)
const motions = input.split('\n')

console.log(motions[motions.length - 1])

type Direction = 'U' | 'D' | 'L' | 'R'
type Position = { x: number; y: number }

function move(dir: Direction, currentPosition: Position): Position {
  switch (dir) {
    case 'U':
      return { ...currentPosition, y: currentPosition.y - 1 }
    case 'D':
      return { ...currentPosition, y: currentPosition.y + 1 }
    case 'L':
      return { ...currentPosition, x: currentPosition.x - 1 }
    case 'R':
      return { ...currentPosition, x: currentPosition.x + 1 }
  }
}

function moveTail(headPos: Position, tailPos: Position): Position {
  const xDistance = Math.abs(headPos.x - tailPos.x)
  const yDistance = Math.abs(headPos.y - tailPos.y)

  if (xDistance < 2 && yDistance < 2) {
    return tailPos
  }

  let moveX = 0
  let moveY = 0

  if (headPos.x !== tailPos.x) {
    moveX = headPos.x - tailPos.x < 0 ? -1 : 1
  }
  if (headPos.y !== tailPos.y) {
    moveY = headPos.y - tailPos.y < 0 ? -1 : 1
  }

  return { x: tailPos.x + moveX, y: tailPos.y + moveY }
}

let headPos: Position = { x: 0, y: 0 }
let tailPos: Position = { x: 0, y: 0 }

const visitedTailPositions: { [key: string]: boolean } = {}

motions
  .map<[Direction, string]>(motion => motion.split(' ') as [Direction, string])
  .map<[Direction, number]>(([dir, steps]) => [dir, Number(steps)])
  .forEach(([dir, steps]: [Direction, number]) => {
    for (let step = 0; step < steps; step += 1) {
      headPos = move(dir, headPos)
      tailPos = moveTail(headPos, tailPos)
      visitedTailPositions[JSON.stringify(tailPos)] = true
    }
  })

console.log(Object.keys(visitedTailPositions).length)
