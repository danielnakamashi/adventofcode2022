import fs from 'fs'
import path from 'path'

const input = fs
  .readFileSync(path.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .slice(0, -1)
  .split('\n$')

// console.log('input', input)

type File = number
type Dir = { [key: string]: Dir | File }

class Interpreter {
  #currentPath: string[]
  #tree: Dir

  constructor() {
    this.#currentPath = []
    this.#tree = {}
  }

  cd(arg: '/' | '..' | string) {
    switch (arg) {
      case '/':
        return (this.#currentPath = ['/'])
      case '..':
        return this.#currentPath.pop()
      default:
        return this.#currentPath.push(arg)
    }
  }

  #getDir(path: string[]): Dir | undefined {
    return path.reduce<Dir | undefined>((acc, curr) => {
      if (acc === undefined) {
        return undefined
      }

      return acc[curr] as Dir
    }, this.#tree)
  }

  #makeDir(path: string[]): Dir {
    return path.reduce<Dir>((acc, curr) => {
      if (acc[curr] === undefined) {
        acc[curr] = {}
      }

      return acc[curr] as Dir
    }, this.#tree)
  }

  #getEntry(path: string[]): Dir | File | undefined {
    return path.reduce<Dir | File | undefined>((acc, curr) => {
      if (this.#isDir(acc)) {
        return acc[curr]
      }

      return undefined
    }, this.#tree)
  }

  ls(_: string, result: string[]) {
    const branch = this.#makeDir(this.#currentPath)
    result.forEach(resultLine => {
      const [sizeOrDir, name] = resultLine.split(' ')
      branch[name] = sizeOrDir === 'dir' ? {} : Number(sizeOrDir)
    })
  }

  get tree() {
    return this.#tree
  }

  #isDir(value: Dir | File | undefined): value is Dir {
    return typeof value === 'object'
  }

  getTotalDirsWithMaxSize(
    maxSize: number,
    path: string[],
    total: { value: number } = { value: 0 }
  ): number {
    const branch = this.#getDir(path)
    if (branch === undefined) {
      return 0
    }

    const size = Object.entries(branch).reduce((acc, [key, value]) => {
      if (this.#isDir(value)) {
        const size = this.getTotalDirsWithMaxSize(
          maxSize,
          [...path, key],
          total
        )
        acc += size
      } else {
        acc += value
      }

      return acc
    }, 0)
    if (size < maxSize) {
      total.value += size
    }
    return size
  }

  // {
  //  "/": total
  //  "/a": total
  //  "/a/e": total
  //  "/d": total
  // }
  getSize(path: string[]): number | undefined {
    const branch = this.#getEntry(path.length === 0 ? ['/'] : path)
    if (this.#isDir(branch)) {
      return Object.entries(branch).reduce((total, [key, value]) => {
        if (this.#isDir(value)) {
          total += this.getSize([...path, key]) ?? 0
        } else {
          total += value
        }

        return total
      }, 0)
    }

    return branch
  }

  listDirs(path: string[]): { [key: string]: number } {
    const branch = this.#getDir(path)

    if (branch === undefined) {
      return {}
    }

    if (!this.#isDir(branch)) {
      return {}
    }

    const size = this.getSize(path)
    return {
      ...(size !== undefined ? { [path.join('/')]: size } : {}),
      ...Object.entries(branch).reduce<{ [key: string]: number }>(
        (report, [key, _]) => {
          return {
            ...report,
            ...this.listDirs([...path, key]),
          }
        },
        {}
      ),
    }
  }
}

const interpreter = new Interpreter()
input.forEach(chunk => {
  const [exec, ...result] = chunk.split('\n')
  const [_, command, arg] = exec.split(' ')

  if (!['cd', 'ls'].includes(command)) {
    return
  }

  interpreter[command as 'cd' | 'ls'](arg, result)
})

console.log(JSON.stringify(interpreter.tree, undefined, 2))
// const total = { value: 0 }
// console.log(interpreter.getTotalDirsWithMaxSize(100000, ['/'], total), total)
// console.log('total', interpreter.getSize(['/', 'a']))
console.log(interpreter.listDirs(['/']))
const dirs = interpreter.listDirs(['/'])
const rootSpace = dirs['/']
const totalSpace = 70000000
const freeSpace = totalSpace - rootSpace
const spaceToDelete = 30000000 - freeSpace

const eligibleSpaces = Object.values(dirs).filter(
  space => space >= spaceToDelete
)
console.log(Math.min(...eligibleSpaces))
