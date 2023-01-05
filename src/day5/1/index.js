"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
});
const stackRegexLine = /^(\[\w{1}\]|\s{3})\s(\[\w{1}\]|\s{3})\s(\[\w{1}\]|\s{3})\s(\[\w{1}\]|\s{3})\s(\[\w{1}\]|\s{3})\s(\[\w{1}\]|\s{3})\s(\[\w{1}\]|\s{3})\s(\[\w{1}\]|\s{3})\s(\[\w{1}\]|\s{3})$/;
const commandRegex = /^move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)$/;
function createStacks(stacksInput) {
    return stacksInput
        .split('\n')
        .slice(0, -1)
        .map(stackInput => stackInput.match(stackRegexLine))
        .reduce((stacks, line) => {
        if (line === null) {
            throw new Error('Invalid input');
        }
        for (let i = 1; i <= 9; i += 1) {
            const letter = line[i][1];
            if (letter === ' ') {
                continue;
            }
            stacks[i - 1].unshift(letter);
        }
        return stacks;
    }, Array.from(Array(9), () => []));
}
function interpretCommand(stack, command) {
    const matches = command.match(commandRegex);
    if (!matches || matches.length < 4) {
        throw new Error(`invalid command: ${command}`);
    }
    const [_, qtd, from, to] = matches;
    // console.log(qtd, from, to)
    for (let i = 0; i < Number(qtd); i += 1) {
        const item = stacks[Number(from) - 1].pop();
        // console.log('item', item)
        if (!item) {
            throw new Error('empty stack');
        }
        stacks[Number(to) - 1].push(item);
    }
}
const [stacksInput, commandsInput] = input.split('\n\n');
const stacks = createStacks(stacksInput);
const commands = commandsInput.split('\n').slice(0, -1);
// console.log('commands', commands)
for (let command of commands) {
    interpretCommand(stacks, command);
}
const result = [];
for (let i = 0; i < 9; i += 1) {
    result.push(stacks[i].pop());
}
console.log(result.join(''));
//# sourceMappingURL=index.js.map