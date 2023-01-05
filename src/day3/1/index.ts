import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, './input.txt'), { encoding: 'utf-8' })

const duplicatedChars = input.split('\n').slice(0, -1).map<[string, string]>((line) => {
  return [line.slice(0, line.length / 2), line.slice(line.length / 2)]
})
  .map(([firstHalf, secondHalf]) => {
    const chars = new Set<string>()
    for (let char of firstHalf) {
      chars.add(char)
    }

    for (let char of secondHalf) {
      if (chars.has(char)) {
        return char
      }
    }
  })
  .map((char) => char ? char.charCodeAt(0) : 0)
  .map((priority) => priority > 96 ? priority - 96 : priority - 38)
  .reduce((acc, curr) => acc + curr, 0)

console.log(duplicatedChars)
