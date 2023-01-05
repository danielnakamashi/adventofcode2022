"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Interpreter_instances, _Interpreter_currentPath, _Interpreter_tree, _Interpreter_getDir, _Interpreter_makeDir, _Interpreter_getEntry, _Interpreter_isDir;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const input = fs_1.default
    .readFileSync(path_1.default.join(__dirname, './input.txt'), {
    encoding: 'utf-8',
})
    .slice(0, -1)
    .split('\n$');
class Interpreter {
    constructor() {
        _Interpreter_instances.add(this);
        _Interpreter_currentPath.set(this, void 0);
        _Interpreter_tree.set(this, void 0);
        __classPrivateFieldSet(this, _Interpreter_currentPath, [], "f");
        __classPrivateFieldSet(this, _Interpreter_tree, {}, "f");
    }
    cd(arg) {
        switch (arg) {
            case '/':
                return (__classPrivateFieldSet(this, _Interpreter_currentPath, ['/'], "f"));
            case '..':
                return __classPrivateFieldGet(this, _Interpreter_currentPath, "f").pop();
            default:
                return __classPrivateFieldGet(this, _Interpreter_currentPath, "f").push(arg);
        }
    }
    ls(_, result) {
        const branch = __classPrivateFieldGet(this, _Interpreter_instances, "m", _Interpreter_makeDir).call(this, __classPrivateFieldGet(this, _Interpreter_currentPath, "f"));
        result.forEach(resultLine => {
            const [sizeOrDir, name] = resultLine.split(' ');
            branch[name] = sizeOrDir === 'dir' ? {} : Number(sizeOrDir);
        });
    }
    get tree() {
        return __classPrivateFieldGet(this, _Interpreter_tree, "f");
    }
    getTotalDirsWithMaxSize(maxSize, path, total = { value: 0 }) {
        const branch = __classPrivateFieldGet(this, _Interpreter_instances, "m", _Interpreter_getDir).call(this, path);
        if (branch === undefined) {
            return 0;
        }
        const size = Object.entries(branch).reduce((acc, [key, value]) => {
            if (__classPrivateFieldGet(this, _Interpreter_instances, "m", _Interpreter_isDir).call(this, value)) {
                const size = this.getTotalDirsWithMaxSize(maxSize, [...path, key], total);
                acc += size;
            }
            else {
                acc += value;
            }
            return acc;
        }, 0);
        if (size < maxSize) {
            total.value += size;
        }
        return size;
    }
    // {
    //  "/": total
    //  "/a": total
    //  "/a/e": total
    //  "/d": total
    // }
    getSize(path) {
        const branch = __classPrivateFieldGet(this, _Interpreter_instances, "m", _Interpreter_getEntry).call(this, path.length === 0 ? ['/'] : path);
        if (__classPrivateFieldGet(this, _Interpreter_instances, "m", _Interpreter_isDir).call(this, branch)) {
            return Object.entries(branch).reduce((total, [key, value]) => {
                var _a;
                if (__classPrivateFieldGet(this, _Interpreter_instances, "m", _Interpreter_isDir).call(this, value)) {
                    total += (_a = this.getSize([...path, key])) !== null && _a !== void 0 ? _a : 0;
                }
                else {
                    total += value;
                }
                return total;
            }, 0);
        }
        return branch;
    }
    listDirs(path) {
        const branch = __classPrivateFieldGet(this, _Interpreter_instances, "m", _Interpreter_getDir).call(this, path);
        if (branch === undefined) {
            return {};
        }
        if (!__classPrivateFieldGet(this, _Interpreter_instances, "m", _Interpreter_isDir).call(this, branch)) {
            return {};
        }
        const size = this.getSize(path);
        return Object.assign(Object.assign({}, (size !== undefined ? { [path.join('/')]: size } : {})), Object.entries(branch).reduce((report, [key, _]) => {
            return Object.assign(Object.assign({}, report), this.listDirs([...path, key]));
        }, {}));
    }
}
_Interpreter_currentPath = new WeakMap(), _Interpreter_tree = new WeakMap(), _Interpreter_instances = new WeakSet(), _Interpreter_getDir = function _Interpreter_getDir(path) {
    return path.reduce((acc, curr) => {
        if (acc === undefined) {
            return undefined;
        }
        return acc[curr];
    }, __classPrivateFieldGet(this, _Interpreter_tree, "f"));
}, _Interpreter_makeDir = function _Interpreter_makeDir(path) {
    return path.reduce((acc, curr) => {
        if (acc[curr] === undefined) {
            acc[curr] = {};
        }
        return acc[curr];
    }, __classPrivateFieldGet(this, _Interpreter_tree, "f"));
}, _Interpreter_getEntry = function _Interpreter_getEntry(path) {
    return path.reduce((acc, curr) => {
        if (__classPrivateFieldGet(this, _Interpreter_instances, "m", _Interpreter_isDir).call(this, acc)) {
            return acc[curr];
        }
        return undefined;
    }, __classPrivateFieldGet(this, _Interpreter_tree, "f"));
}, _Interpreter_isDir = function _Interpreter_isDir(value) {
    return typeof value === 'object';
};
const interpreter = new Interpreter();
input.forEach(chunk => {
    const [exec, ...result] = chunk.split('\n');
    const [_, command, arg] = exec.split(' ');
    if (!['cd', 'ls'].includes(command)) {
        return;
    }
    interpreter[command](arg, result);
});
console.log(JSON.stringify(interpreter.tree, undefined, 2));
// const total = { value: 0 }
// console.log(interpreter.getTotalDirsWithMaxSize(100000, ['/'], total), total)
// console.log('total', interpreter.getSize(['/', 'a']))
console.log(interpreter.listDirs(['/']));
const dirs = interpreter.listDirs(['/']);
const rootSpace = dirs['/'];
const totalSpace = 70000000;
const freeSpace = totalSpace - rootSpace;
const spaceToDelete = 30000000 - freeSpace;
const eligibleSpaces = Object.values(dirs).filter(space => space >= spaceToDelete);
console.log(Math.min(...eligibleSpaces));
//# sourceMappingURL=index.js.map