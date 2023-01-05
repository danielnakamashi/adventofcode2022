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
const monkeys = input.split('\n\n');
function mapMonkey(monkey) {
    var _a, _b, _c;
    const lines = monkey.split('\n');
    // const number = lines[0].match(/^Monkey (\d):$/)?.[1] as string
    const items = lines[1].split(': ')[1].split(', ').map(Number);
    const operation = lines[2].split('= ')[1];
    const test = Number((_a = lines[3].split(': ')[1].match(/\d+$/)) === null || _a === void 0 ? void 0 : _a[0]);
    const trueCase = Number((_b = lines[4].match(/\d+$/)) === null || _b === void 0 ? void 0 : _b[0]);
    const falseCase = Number((_c = lines[5].match(/\d+$/)) === null || _c === void 0 ? void 0 : _c[0]);
    return {
        items,
        operation: old => {
            return eval(operation);
        },
        test: worryLevel => {
            return worryLevel % test === 0 ? trueCase : falseCase;
        },
    };
}
const activeMonkeys = {};
const monkeysData = monkeys.map(mapMonkey);
for (let i = 0; i < 20; i += 1) {
    monkeysData.forEach((currentMonkey, currentMonkeyIndex) => {
        for (let currentItem = currentMonkey.items.shift(); currentItem !== undefined; currentItem = currentMonkey.items.shift()) {
            const operationResult = Math.floor(currentMonkey.operation(currentItem) / 3);
            const monkeyToThrow = currentMonkey.test(operationResult);
            monkeysData[monkeyToThrow].items.push(operationResult);
            activeMonkeys[currentMonkeyIndex] = activeMonkeys[currentMonkeyIndex]
                ? activeMonkeys[currentMonkeyIndex] + 1
                : 1;
        }
    });
}
console.log(Object.values(activeMonkeys));
console.log(Object.values(activeMonkeys)
    .sort((a, b) => b - a)
    .splice(0, 2)
    .reduce((acc, curr) => acc * curr));
//# sourceMappingURL=part1.js.map