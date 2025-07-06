"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApp = generateApp;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
async function generateApp(systemPrompt, userDescription) {
    const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL_NAME || 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userDescription }
        ],
        response_format: { type: 'json_object' },
    });
    const content = response.choices[0].message.content;
    if (!content)
        throw new Error('API returned an empty response.');
    //fs.writeFileSync(`${process.cwd()}/gptResponse.json`, JSON.stringify(response));
    const parsed = JSON.parse(content);
    // Parse nested .json strings
    for (const [filePath, fileContent] of Object.entries(parsed)) {
        if (filePath.endsWith('.json') && typeof fileContent === 'string') {
            try {
                parsed[filePath] = JSON.parse(fileContent);
            }
            catch (err) {
                console.warn(`Skipping nested parse for: ${filePath}`);
            }
        }
    }
    return parsed;
}
