"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shapeScoreMap = Object.freeze({
    'X': 1,
    'Y': 2,
    'Z': 3
});
const outcomeScoreMap = {
    'A Y': 6,
    'B Z': 6,
    'C X': 6,
    'A X': 3,
    'B Y': 3,
    'C Z': 3,
    'A Z': 0,
    'B X': 0,
    'C Y': 0
};
const input = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), { encoding: 'utf-8' });
const total = input.split('\n').map((strategy) => {
    if (strategy.length !== 3) {
        return 0;
    }
    const [opponent, me] = strategy.split(' ');
    const shapeScore = shapeScoreMap[me];
    const outcomeScore = outcomeScoreMap[`${opponent} ${me}`];
    return shapeScore + outcomeScore;
}).reduce((acc, curr) => acc + curr, 0);
console.log('total', total);
//# sourceMappingURL=index.js.map