import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, './input.txt'), { encoding: 'utf-8' })

const lines = input.split('\n').slice(0, -1)
const chunks = []
for (let i = 0; i < lines.length; i += 3) {
    chunks.push(lines.slice(i, i + 3))
}

const total = chunks
  .map(([first, second, third]) => {
    const chars = new Set<string>()
    for (let char of first) {
      chars.add(char)
    }

    const common = new Set<string>()
    for (let char of second) {
      if (chars.has(char)) {
        common.add(char)
      }
    }

    for (let char of third) {
      if (common.has(char)) {
        return char
      }
    }
  })
  .map((char) => char ? char.charCodeAt(0) : 0)
  .map((priority) => priority > 96 ? priority - 96 : priority - 38)
  .reduce((acc, curr) => acc + curr, 0)

console.log(total)
