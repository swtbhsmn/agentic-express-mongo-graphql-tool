"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const child_process_2 = require("child_process");
const util_1 = __importDefault(require("util"));
const execPromise = util_1.default.promisify(child_process_1.exec);
async function setupAndRun(baseDir) {
    try {
        console.log('\n📦 Installing dependencies...');
        await execPromise('npm install', { cwd: baseDir });
        console.log('\n🚀 Starting the development server...');
        const dev = (0, child_process_2.spawn)('npm', ['run', 'dev'], {
            cwd: baseDir,
            stdio: 'inherit',
            shell: true,
        });
        dev.on('error', (err) => {
            console.error('❌ Failed to start development server:', err);
        });
        dev.on('exit', (code) => {
            console.log(`💡 Development server exited with code ${code}`);
        });
    }
    catch (err) {
        console.error('\n❌ Error during setup:', err);
    }
}
exports.default = setupAndRun;
