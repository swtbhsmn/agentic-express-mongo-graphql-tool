"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveDirectory = moveDirectory;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Recursively moves a directory from 'srcDir' to 'destDir'.
 */
function moveDirectory(srcDir, destDir) {
    if (!fs_1.default.existsSync(srcDir)) {
        throw new Error(`❌ Source directory does not exist: ${srcDir}`);
    }
    if (!fs_1.default.existsSync(destDir)) {
        fs_1.default.mkdirSync(destDir, { recursive: true });
    }
    const entries = fs_1.default.readdirSync(srcDir, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path_1.default.join(srcDir, entry.name);
        const destPath = path_1.default.join(destDir, entry.name);
        if (entry.isDirectory()) {
            moveDirectory(srcPath, destPath); // recursive
        }
        else {
            fs_1.default.renameSync(srcPath, destPath);
        }
    }
    fs_1.default.rmdirSync(srcDir);
}
