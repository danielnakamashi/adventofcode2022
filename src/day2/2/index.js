"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const myShapeMap = {
    'A X': 'C',
    'A Y': 'A',
    'A Z': 'B',
    'B X': 'A',
    'B Y': 'B',
    'B Z': 'C',
    'C X': 'B',
    'C Y': 'C',
    'C Z': 'A'
};
const shapeScore = {
    'A': 1,
    'B': 2,
    'C': 3
};
const outcomeScore = {
    'X': 0,
    'Y': 3,
    'Z': 6
};
const input = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), { encoding: 'utf-8' });
const total = input.split('\n').map((strategy) => {
    if (strategy.length !== 3) {
        return 0;
    }
    const [opponent, outcome] = strategy.split(' ');
    const myShape = myShapeMap[`${opponent} ${outcome}`];
    return shapeScore[myShape] + outcomeScore[outcome];
}).reduce((acc, curr) => acc + curr, 0);
console.log('total', total);
//# sourceMappingURL=index.js.map