import fs from 'fs'
import path from 'path'

type OpponentShape = 'A' | 'B' | 'C'
type MyShape = 'X' | 'Y' | 'Z'

const shapeScoreMap: Record<MyShape, number> = Object.freeze({
  'X': 1,
  'Y': 2,
  'Z': 3
})

const outcomeScoreMap: Record<`${OpponentShape} ${MyShape}`, number> = {
'A Y': 6,
 'B Z': 6,
 'C X': 6,
'A X': 3,
 'B Y': 3,
 'C Z': 3,
'A Z': 0,
 'B X': 0,
 'C Y': 0
}

const input = fs.readFileSync(path.join(__dirname, './input.txt'), { encoding: 'utf-8' })

const total = input.split('\n').map((strategy) => {
  if (strategy.length !== 3) {
    return 0
  }

  const [opponent, me] = strategy.split(' ') as [OpponentShape, MyShape]
  const shapeScore = shapeScoreMap[me]
  const outcomeScore = outcomeScoreMap[`${opponent} ${me}`]

  return shapeScore + outcomeScore
}).reduce((acc, curr) => acc + curr, 0)

console.log('total', total)
