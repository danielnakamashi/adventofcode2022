import fs from 'fs'
import path from 'path'

const IS_TEST = false
const input = fs
  .readFileSync(path.join(__dirname, `./input${IS_TEST ? '_test' : ''}.txt`), {
    encoding: 'utf-8',
  })
  .slice(0, -1)

const monkeys = input.split('\n\n')
let MOD = 1

type Monkey = {
  items: number[]
  operation: (worryLevel: number) => number
  test: (worryLevel: number) => number
}
function mapMonkey(monkey: string): Monkey {
  const lines = monkey.split('\n')
  // const number = lines[0].match(/^Monkey (\d):$/)?.[1] as string
  const items = lines[1].split(': ')[1].split(', ').map(Number) as number[]
  const operation = lines[2].split('= ')[1] as string
  const test = Number(lines[3].split(': ')[1].match(/\d+$/)?.[0])
  MOD *= test
  const trueCase = Number(lines[4].match(/\d+$/)?.[0])
  const falseCase = Number(lines[5].match(/\d+$/)?.[0])

  return {
    items,
    operation: old => {
      const result = eval(operation) % MOD
      return result
    },
    test: worryLevel => {
      return worryLevel % test === 0 ? trueCase : falseCase
    },
  }
}

const activeMonkeys: Record<number, number> = {}
const monkeysData = monkeys.map(mapMonkey)
for (let i = 0; i < 10000; i += 1) {
  monkeysData.forEach((currentMonkey, currentMonkeyIndex) => {
    for (
      let currentItem = currentMonkey.items.shift();
      currentItem !== undefined;
      currentItem = currentMonkey.items.shift()
    ) {
      const operationResult = currentMonkey.operation(currentItem)

      const monkeyToThrow = currentMonkey.test(operationResult)

      monkeysData[monkeyToThrow].items.push(operationResult)
      activeMonkeys[currentMonkeyIndex] = activeMonkeys[currentMonkeyIndex]
        ? activeMonkeys[currentMonkeyIndex] + 1
        : 1
    }
  })
}

console.log('MOD', MOD)
console.log(Object.values(activeMonkeys))
console.log(
  Object.values(activeMonkeys)
    .sort((a, b) => b - a)
    .splice(0, 2)
    .reduce((acc, curr) => acc * curr)
)
