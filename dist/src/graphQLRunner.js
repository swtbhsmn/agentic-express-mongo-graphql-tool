"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runGraphQLGeneration = runGraphQLGeneration;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_graphql_codegen_1 = require("mongoose-graphql-codegen");
async function runGraphQLGeneration(baseDir) {
    const modelDir = path_1.default.join(baseDir, 'models');
    if (!fs_1.default.existsSync(modelDir)) {
        console.error(`❌ Model directory not found at: ${modelDir}`);
        process.exit(1);
    }
    const files = fs_1.default.readdirSync(modelDir).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
    if (!files.length) {
        console.error('❌ No model files found in models directory.');
        process.exit(1);
    }
    await Promise.all(files.map(async (file) => {
        try {
            await (0, mongoose_graphql_codegen_1.generateGraphQL)(path_1.default.join(modelDir, file), false);
            console.log(`✅ GraphQL generated for ${file}`);
        }
        catch (e) {
            console.error(`❌ Failed for ${file}:`, e);
        }
    }));
}
