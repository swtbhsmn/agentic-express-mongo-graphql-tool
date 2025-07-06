"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyAndChangeExtension = copyAndChangeExtension;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function copyAndChangeExtension(srcFilePath, destDir, newFileName) {
    if (!fs_1.default.existsSync(srcFilePath)) {
        throw new Error(`Source file does not exist: ${srcFilePath}`);
    }
    if (!fs_1.default.existsSync(destDir)) {
        fs_1.default.mkdirSync(destDir, { recursive: true });
    }
    const fileData = fs_1.default.readFileSync(srcFilePath, 'utf-8');
    const destFilePath = path_1.default.join(destDir, newFileName);
    fs_1.default.writeFileSync(destFilePath, fileData, 'utf-8');
}
