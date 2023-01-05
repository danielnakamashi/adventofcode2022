"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), { encoding: 'utf-8' });
const duplicatedChars = input.split('\n').slice(0, -1).map((line) => {
    return [line.slice(0, line.length / 2), line.slice(line.length / 2)];
})
    .map(([firstHalf, secondHalf]) => {
    const chars = new Set();
    for (let char of firstHalf) {
        chars.add(char);
    }
    for (let char of secondHalf) {
        if (chars.has(char)) {
            return char;
        }
    }
})
    .map((char) => char ? char.charCodeAt(0) : 0)
    .map((priority) => priority > 96 ? priority - 96 : priority - 38)
    .reduce((acc, curr) => acc + curr, 0);
console.log(duplicatedChars);
//# sourceMappingURL=index.js.map