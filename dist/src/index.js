"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promptLoader_1 = require("./promptLoader");
const generator_1 = require("./generator");
const fileWriter_1 = require("./fileWriter");
const graphQLRunner_1 = require("./graphQLRunner");
const path_1 = __importDefault(require("path"));
const moveDir_1 = require("./moveDir");
const copyAndChangeExtension_1 = require("./copyAndChangeExtension");
async function main() {
    console.log('🚀 Welcome to the Agentic AI Backend Node-Express Generator!');
    try {
        const { systemPrompt, description } = await (0, promptLoader_1.getUserPrompt)();
        console.log('\n🤔 Thinking... Designing the full application for you...\n');
        const parsed = await (0, generator_1.generateApp)(systemPrompt, description);
        (0, fileWriter_1.writeFiles)(parsed);
        const baseDir = path_1.default.join(process.cwd(), Object.keys(parsed)[0]?.split('/')[0]);
        console.log('\n🛠 Generating GraphQL schema from models...\n');
        await (0, graphQLRunner_1.runGraphQLGeneration)(baseDir).then(res => {
            (0, moveDir_1.moveDirectory)(`${process.cwd()}/graphql-codegen`, `${process.cwd()}/${Object.keys(parsed)[0]?.split('/')[0]}/graphql-codegen`);
            (0, copyAndChangeExtension_1.copyAndChangeExtension)(`${process.cwd()}/prerequisites/index.txt`, `${process.cwd()}/${Object.keys(parsed)[0]?.split('/')[0]}`, 'index.ts');
            (0, copyAndChangeExtension_1.copyAndChangeExtension)(`${process.cwd()}/prerequisites/tsconfig.txt`, `${process.cwd()}/${Object.keys(parsed)[0]?.split('/')[0]}`, 'tsconfig.json');
        });
        console.log('\n🎉 All done! Your complete backend is ready.');
        console.log(`Your project directory: $${Object.keys(parsed)[0]?.split('/')[0]}`);
        console.log("Next steps:");
        console.log('Go to project root directory');
        console.log("1. Create a '.env' file with your MONGO_URI.");
        console.log("2. Run 'npm install'.");
        console.log("3. Run 'npm run dev'.");
    }
    catch (err) {
        console.error('\n❌ Error:', err);
    }
}
main();
