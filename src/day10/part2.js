"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const IS_TEST = false;
const input = fs_1.default
    .readFileSync(path_1.default.join(__dirname, `./input${IS_TEST ? '_test' : ''}.txt`), {
    encoding: 'utf-8',
})
    .slice(0, -1);
const CYCLES_BY_INST = Object.freeze({
    noop: 1,
    addx: 2,
});
const CPU_INSTRUCTIONS = Object.freeze({
    noop: () => { },
    addx: (arg, registers) => (registers.x += arg),
});
const instructionsList = input.split('\n');
function read(instructions, index) {
    const [instruction, arg] = instructions[index].split(' ');
    return [instruction, Number(arg)];
}
function* execute(instruction, arg, registers) {
    for (let c = CYCLES_BY_INST[instruction]; c >= 0; c -= 1) {
        if (c === 0) {
            CPU_INSTRUCTIONS[instruction](arg, registers);
            return;
        }
        yield;
    }
}
function main(instructionsList) {
    let registers = { x: 1 };
    let cycle = 1;
    let screen = [];
    for (let i = 0; i < instructionsList.length; i += 1) {
        const [instruction, arg] = read(instructionsList, i);
        const iter = execute(instruction, arg, registers);
        for (const _ of iter) {
            // console.log(cycle, registers.x)
            screen[cycle - 1] =
                Math.abs(registers.x - ((cycle - 1) % 40)) > 1 ? '.' : '#';
            cycle += 1;
        }
    }
    return screen.join('');
}
console.log(main(instructionsList).match(/.{40}/g));
//# sourceMappingURL=part2.js.map