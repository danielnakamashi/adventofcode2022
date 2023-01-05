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
const motions = input.split('\n');
console.log(motions[motions.length - 1]);
function move(dir, currentPosition) {
    switch (dir) {
        case 'U':
            return Object.assign(Object.assign({}, currentPosition), { y: currentPosition.y - 1 });
        case 'D':
            return Object.assign(Object.assign({}, currentPosition), { y: currentPosition.y + 1 });
        case 'L':
            return Object.assign(Object.assign({}, currentPosition), { x: currentPosition.x - 1 });
        case 'R':
            return Object.assign(Object.assign({}, currentPosition), { x: currentPosition.x + 1 });
    }
}
function moveTail(headPos, tailPos) {
    const xDistance = Math.abs(headPos.x - tailPos.x);
    const yDistance = Math.abs(headPos.y - tailPos.y);
    if (xDistance < 2 && yDistance < 2) {
        return tailPos;
    }
    let moveX = 0;
    let moveY = 0;
    if (headPos.x !== tailPos.x) {
        moveX = headPos.x - tailPos.x < 0 ? -1 : 1;
    }
    if (headPos.y !== tailPos.y) {
        moveY = headPos.y - tailPos.y < 0 ? -1 : 1;
    }
    return { x: tailPos.x + moveX, y: tailPos.y + moveY };
}
let headPos = { x: 0, y: 0 };
let tailPos = { x: 0, y: 0 };
const visitedTailPositions = {};
motions
    .map(motion => motion.split(' '))
    .map(([dir, steps]) => [dir, Number(steps)])
    .forEach(([dir, steps]) => {
    for (let step = 0; step < steps; step += 1) {
        headPos = move(dir, headPos);
        tailPos = moveTail(headPos, tailPos);
        visitedTailPositions[JSON.stringify(tailPos)] = true;
    }
});
console.log(Object.keys(visitedTailPositions).length);
//# sourceMappingURL=part1.js.map