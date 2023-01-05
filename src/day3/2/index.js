"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), { encoding: 'utf-8' });
const lines = input.split('\n').slice(0, -1);
const chunks = [];
for (let i = 0; i < lines.length; i += 3) {
    chunks.push(lines.slice(i, i + 3));
}
const total = chunks
    .map(([first, second, third]) => {
    const chars = new Set();
    for (let char of first) {
        chars.add(char);
    }
    const common = new Set();
    for (let char of second) {
        if (chars.has(char)) {
            common.add(char);
        }
    }
    for (let char of third) {
        if (common.has(char)) {
            return char;
        }
    }
})
    .map((char) => char ? char.charCodeAt(0) : 0)
    .map((priority) => priority > 96 ? priority - 96 : priority - 38)
    .reduce((acc, curr) => acc + curr, 0);
console.log(total);
//# sourceMappingURL=index.js.map