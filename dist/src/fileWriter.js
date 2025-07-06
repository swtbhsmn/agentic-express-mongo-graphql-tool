"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFiles = writeFiles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function writeFiles(parsed) {
    Object.entries(parsed).forEach(([filePath, content]) => {
        const dir = path_1.default.dirname(filePath);
        if (!fs_1.default.existsSync(dir))
            fs_1.default.mkdirSync(dir, { recursive: true });
        fs_1.default.writeFileSync(filePath, typeof content === 'string' ? content : JSON.stringify(content, null, 2));
    });
    console.log('✅ Files created successfully.');
}
