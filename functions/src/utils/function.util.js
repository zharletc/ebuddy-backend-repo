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
exports.copyDirectoryWithProgress = copyDirectoryWithProgress;
exports.execShellCommand = execShellCommand;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
function copyDirectoryWithProgress(source, destination, excludeFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield fs_extra_1.default.readdir(source, { withFileTypes: true });
        for (const item of items) {
            const sourcePath = path_1.default.join(source, item.name);
            const destinationPath = path_1.default.join(destination, item.name);
            // Skip excluded file
            if (excludeFile && item.name === excludeFile) {
                console.log(`Skipping ${item.name}`);
                continue;
            }
            if (item.isDirectory()) {
                yield fs_extra_1.default.ensureDir(destinationPath);
                yield copyDirectoryWithProgress(sourcePath, destinationPath, excludeFile); // Recursively copy subdirectories
            }
            else {
                yield fs_extra_1.default.copy(sourcePath, destinationPath);
                console.log(`Copied file: ${destinationPath}`);
            }
        }
    });
}
function execShellCommand(cmd, options) {
    return new Promise((resolve, reject) => {
        const execOptions = {
            cwd: (options === null || options === void 0 ? void 0 : options.cwd) || process.cwd(), // Gunakan cwd saat ini jika tidak ada yang diberikan
        };
        const modifiedCmd = `${cmd} --no-interaction`;
        shelljs_1.default.exec(modifiedCmd, execOptions, (code, stdout, stderr) => {
            console.log(`Command: ${cmd}`);
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (code !== 0) {
                reject(new Error(stderr));
            }
            else {
                resolve();
            }
        });
    });
}
