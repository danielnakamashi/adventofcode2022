import fs from 'fs'
import path from 'path'

function hasDuplicateChar(str: string): boolean {
  const dict: Record<string, boolean> = {}

  for (let char of str) {
    if (dict[char]) {
      return true
    }

    dict[char] = true
  }

  return false
}

function findMessage(input: string): number {
  let packet = input.slice(0, 14)
  let index = 14
  for (let char of input.slice(14)) {
    console.log('packet', packet)
    if (!hasDuplicateChar(packet)) {
      return index
    }

    packet = packet.slice(1, 14) + char
    index += 1
  }

  return 0
}

const input = fs
  .readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .slice(0, -1)

console.log(findMessage(input))
