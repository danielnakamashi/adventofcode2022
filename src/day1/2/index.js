"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), { encoding: 'utf-8' });
const elfCalories = input.split('\n\n');
const max = elfCalories.reduce((max, curr) => {
    const total = curr.split('\n').map((calorie) => Number(calorie)).reduce((sum, num) => sum + num, 0);
    const minAll = Math.min(...max, total);
    if (minAll === total) {
        return max;
    }
    const min = Math.min(...max);
    const minIndex = max.findIndex((count) => count === min);
    max[minIndex] = total;
    return max;
}, [0, 0, 0]).reduce((sum, count) => sum + count, 0);
console.log(max);
//# sourceMappingURL=index.js.map