import fs from 'fs'
import path from 'path'

const regexp = /(\d+)\-(\d+)?/

function getMinMax(range: string): [number, number] {
  const matches = range.match(regexp)

  if (!matches || matches.length < 3) {
    throw new Error('Range is invalid')
  }

  return [Number(matches[1]), Number(matches[2])]
}

const input = fs.readFileSync(path.join(__dirname, './input.txt'), {
  encoding: 'utf-8',
})

const result = input
  .split('\n')
  .slice(0, -1)
  .map(line => line.split(','))
  .map(tupple => {
    return tupple.map(getMinMax)
  })
  .map(([first, second]) => {
    return (first[0] <= second[0] && first[1] >= second[1]) ||
      (second[0] <= first[0] && second[1] >= first[1])
      ? 1
      : 0
  })
  .reduce<number>((sum, curr) => sum + curr, 0)

console.log(result)
