import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, './input.txt'), { encoding: 'utf-8' })
const elfCalories = input.split('\n\n')

const max = elfCalories.reduce<[number, number, number]>((max, curr) => {
  const total = curr.split('\n').map((calorie) => Number(calorie)).reduce<number>((sum, num) => sum + num, 0)
  const minAll = Math.min(...max, total)
  if (minAll === total) {
    return max
  }

  const min = Math.min(...max)
  const minIndex = max.findIndex((count) => count === min)
  max[minIndex] = total

  return max
}, [0, 0, 0]).reduce((sum, count) => sum + count, 0)

console.log(max)
