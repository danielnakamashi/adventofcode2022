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

function findPackageStart(input: string): number {
  let packet = input.slice(0, 4)
  let index = 4
  for (let char of input.slice(4)) {
    console.log('packet', packet)
    if (!hasDuplicateChar(packet)) {
      return index
    }

    packet = packet.slice(1, 4) + char
    index += 1
  }

  return 0
}

const input = fs
  .readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .slice(0, -1)

console.log(findPackageStart(input))
