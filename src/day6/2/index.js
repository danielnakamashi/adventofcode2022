"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function hasDuplicateChar(str) {
    const dict = {};
    for (let char of str) {
        if (dict[char]) {
            return true;
        }
        dict[char] = true;
    }
    return false;
}
function findMessage(input) {
    let packet = input.slice(0, 14);
    let index = 14;
    for (let char of input.slice(14)) {
        console.log('packet', packet);
        if (!hasDuplicateChar(packet)) {
            return index;
        }
        packet = packet.slice(1, 14) + char;
        index += 1;
    }
    return 0;
}
const input = fs_1.default
    .readFileSync(path_1.default.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
})
    .slice(0, -1);
console.log(findMessage(input));
//# sourceMappingURL=index.js.map