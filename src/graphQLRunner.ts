import fs from 'fs';
import path from 'path';
import { generateGraphQL } from 'mongoose-graphql-codegen';
export async function runGraphQLGeneration(baseDir: string) {
    const modelDir = path.join(baseDir, 'models');

    if (!fs.existsSync(modelDir)) {
        console.error(`❌ Model directory not found at: ${modelDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(modelDir).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

    if (!files.length) {
        console.error('❌ No model files found in models directory.');
        process.exit(1);
    }

    await Promise.all(
        files.map(async (file) => {
            try {
                await generateGraphQL(path.join(modelDir, file), false);
                console.log(`✅ GraphQL generated for ${file}`);
            } catch (e) {
                console.error(`❌ Failed for ${file}:`, e);
            }
        })
    );

}
