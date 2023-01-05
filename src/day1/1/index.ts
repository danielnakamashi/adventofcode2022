import fs from 'fs'
import path from 'path'
import events from 'events'
import readline from 'readline'

async function main() {
  let max = 0
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'input.txt')),
    crlfDelay: Infinity
  })

  let current = 0
  rl.on('line', (line) => {
    if (line.length === 0) {
      max = Math.max(max, current)
      current = 0
      return
    }

    current += Number(line)
  })

  await events.once(rl, 'close')

  console.log(max)
}

main()
console.log('memory', Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100)


// const input = fs.readFileSync(path.join(__dirname, './input.txt'), { encoding: 'utf-8' })
// const elfCalories = input.split('\n\n')

// const [index, total] = elfCalories.reduce<[number, number]>(([maxIndex, maxCalorie], curr, index) => {
//   const total = curr.split('\n').map((calorie) => Number(calorie)).reduce<number>((sum, num) => sum + num, 0)
//   console.log([maxIndex, maxCalorie], total)
//   return maxCalorie > total ? [maxIndex, maxCalorie] : [index, total]
// }, [0, 0])

// console.log(index, total)
// console.log('memory', Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100)
