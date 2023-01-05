import fs from 'fs'
import path from 'path'

type Shape = 'A' | 'B' | 'C'
type Outcome = 'X' | 'Y' | 'Z'

const myShapeMap: Record<`${Shape} ${Outcome}`, Shape> = {
  'A X': 'C',
  'A Y': 'A',
  'A Z': 'B',
  'B X': 'A',
  'B Y': 'B',
  'B Z': 'C',
  'C X': 'B',
  'C Y': 'C',
  'C Z': 'A'
}
const shapeScore: Record<Shape, number> = {
  'A': 1,
  'B': 2,
  'C': 3
}
const outcomeScore: Record<Outcome, number> = {
  'X': 0,
  'Y': 3,
  'Z': 6
}
const input = fs.readFileSync(path.join(__dirname, './input.txt'), { encoding: 'utf-8' })

const total = input.split('\n').map((strategy) => {
  if (strategy.length !== 3) {
    return 0
  }

  const [opponent, outcome] = strategy.split(' ') as [Shape, Outcome]
  const myShape = myShapeMap[`${opponent} ${outcome}`]

  return shapeScore[myShape] + outcomeScore[outcome]
}).reduce((acc, curr) => acc + curr, 0)

console.log('total', total)
