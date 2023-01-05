"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const regexp = /(\d+)\-(\d+)?/;
function getMinMax(range) {
    const matches = range.match(regexp);
    if (!matches || matches.length < 3) {
        throw new Error('Range is invalid');
    }
    return [Number(matches[1]), Number(matches[2])];
}
function sortByMax(first, second) {
    return first[1] < second[1] ? [first, second] : [second, first];
}
const input = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
});
const result = input
    .split('\n')
    .slice(0, -1)
    .map(line => line.split(','))
    .map(tupple => {
    return tupple.map(getMinMax);
})
    .map(([first, second]) => {
    const [min, max] = sortByMax(first, second);
    return min[1] >= max[0] ? 1 : 0;
})
    .reduce((sum, curr) => sum + curr, 0);
console.log(result);
//# sourceMappingURL=index.js.map