"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const events_1 = __importDefault(require("events"));
const readline_1 = __importDefault(require("readline"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let max = 0;
        const rl = readline_1.default.createInterface({
            input: fs_1.default.createReadStream(path_1.default.join(__dirname, 'input.txt')),
            crlfDelay: Infinity
        });
        let current = 0;
        rl.on('line', (line) => {
            if (line.length === 0) {
                max = Math.max(max, current);
                current = 0;
                return;
            }
            current += Number(line);
        });
        yield events_1.default.once(rl, 'close');
        console.log(max);
    });
}
main();
console.log('memory', Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100);
// const input = fs.readFileSync(path.join(__dirname, './input.txt'), { encoding: 'utf-8' })
// const elfCalories = input.split('\n\n')
// const [index, total] = elfCalories.reduce<[number, number]>(([maxIndex, maxCalorie], curr, index) => {
//   const total = curr.split('\n').map((calorie) => Number(calorie)).reduce<number>((sum, num) => sum + num, 0)
//   console.log([maxIndex, maxCalorie], total)
//   return maxCalorie > total ? [maxIndex, maxCalorie] : [index, total]
// }, [0, 0])
// console.log(index, total)
// console.log('memory', Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100)
//# sourceMappingURL=index.js.map