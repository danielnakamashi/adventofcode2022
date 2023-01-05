import fs from 'fs'
import path from 'path'

const IS_TEST = false
const input = fs
  .readFileSync(path.join(__dirname, `./input${IS_TEST ? '_test' : ''}.txt`), {
    encoding: 'utf-8',
  })
  .slice(0, -1)

type Instruction = 'noop' | 'addx'
type Registers = { [key: string]: number }

const CYCLES_BY_INST: Record<Instruction, number> = Object.freeze({
  noop: 1,
  addx: 2,
})
const CPU_INSTRUCTIONS: Record<
  Instruction,
  (arg: number, registers: Registers) => void
> = Object.freeze({
  noop: () => {},
  addx: (arg, registers) => (registers.x += arg),
})

const instructionsList = input.split('\n') as Array<`${Instruction} ${number}`>

function read(
  instructions: Array<`${Instruction} ${number}`>,
  index: number
): [Instruction, number] {
  const [instruction, arg] = instructions[index].split(' ') as [
    Instruction,
    number
  ]
  return [instruction, Number(arg)]
}

function* execute(instruction: Instruction, arg: number, registers: Registers) {
  for (let c = CYCLES_BY_INST[instruction]; c >= 0; c -= 1) {
    if (c === 0) {
      CPU_INSTRUCTIONS[instruction](arg, registers)
      return
    }

    yield
  }
}

function main(instructionsList: `${Instruction} ${number}`[]) {
  let registers: Registers = { x: 1 }
  let cycle = 1
  let screen: string[] = []
  for (let i = 0; i < instructionsList.length; i += 1) {
    const [instruction, arg] = read(instructionsList, i)
    const iter = execute(instruction, arg, registers)
    for (const _ of iter) {
      // console.log(cycle, registers.x)
      screen[cycle - 1] =
        Math.abs(registers.x - ((cycle - 1) % 40)) > 1 ? '.' : '#'
      cycle += 1
    }
  }

  return screen.join('')
}

console.log(main(instructionsList).match(/.{40}/g))
