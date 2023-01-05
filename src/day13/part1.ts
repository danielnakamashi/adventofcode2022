import fs from 'fs'
import path from 'path'

const IS_TEST = process.argv.length === 3 && process.argv[2] === '--test'
const input = fs
  .readFileSync(path.join(__dirname, `./input${IS_TEST ? '_test' : ''}.txt`), {
    encoding: 'utf-8',
  })
  .slice(0, -1)

function isValidPackage(left: string[], right: string[]): boolean | null {
  while (left.length > 0 || right.length > 0) {
    console.log(left, right)
    const leftItem = left.shift()
    const rightItem = right.shift()
    console.log(leftItem, rightItem)

    if (leftItem === undefined) {
      return true
    }

    if (rightItem === undefined) {
      return false
    }

    if (typeof leftItem === 'number' && typeof rightItem === 'number') {
      if (leftItem < rightItem) {
        return true
      } else if (leftItem > rightItem) {
        return false
      }

      continue
    }

    const isValid = isValidPackage(
      Array.isArray(leftItem) ? leftItem : [leftItem],
      Array.isArray(rightItem) ? rightItem : [rightItem]
    )

    if (isValid === null) {
      continue
    }

    return isValid
  }

  return null
}

function main(input: string) {
  const pairs = input.split('\n\n').map(packages => packages.split('\n'))
  // console.log(pairs)

  const validIndexes: number[] = []
  pairs.forEach(([left, right], index) => {
    if (isValidPackage(JSON.parse(left), JSON.parse(right))) {
      validIndexes.push(index + 1)
    }
  })

  console.log(
    validIndexes,
    validIndexes.reduce((acc, curr) => acc + curr, 0)
  )
}

main(input)
