import fs from 'fs'
import path from 'path'

type Tuple<T = number> = [T, T]

const regexp = /(\d+)\-(\d+)?/

function getMinMax(range: string): Tuple {
  const matches = range.match(regexp)

  if (!matches || matches.length < 3) {
    throw new Error('Range is invalid')
  }

  return [Number(matches[1]), Number(matches[2])]
}

function sortByMax(first: Tuple, second: Tuple): Tuple<Tuple> {
  return first[1] < second[1] ? [first, second] : [second, first]
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
    const [min, max] = sortByMax(first, second)
    return min[1] >= max[0] ? 1 : 0
  })
  .reduce<number>((sum, curr) => sum + curr, 0)

console.log(result)
