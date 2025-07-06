"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPrompt = getUserPrompt;
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function getUserPrompt() {
    const promptPath = path_1.default.join(process.cwd(), 'prompts', 'system-prompt.txt');
    if (!fs_1.default.existsSync(promptPath)) {
        throw new Error(`System prompt not found at ${promptPath}`);
    }
    const systemPrompt = fs_1.default.readFileSync(promptPath, 'utf-8');
    const { description } = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'description',
            message: 'What kind of application would you like to build?',
            default: 'A survey management system where users can create surveys, which have questions and options. Other users can submit responses.',
        },
    ]);
    return { systemPrompt, description };
}
