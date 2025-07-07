import { getUserPrompt } from './promptLoader';
import { generateApp } from './generator';
import { writeFiles } from './fileWriter';
import { runGraphQLGeneration } from './graphQLRunner';
import path from 'path';
import { moveDirectory } from './moveDir';
import { copyAndChangeExtension } from './copyAndChangeExtension';
import {exec} from 'child_process'
import util from 'util';
import setupAndRun from './setupAndRun';
const execPromise = util.promisify(exec);
async function main() {
    console.log('🚀 Welcome to the Agentic AI Backend Node-Express Generator!');

    try {
        const { systemPrompt, description } = await getUserPrompt();

        console.log('\n🤔 Thinking... Designing the full application for you...\n');
        const parsed = await generateApp(systemPrompt, description);

        writeFiles(parsed);

        const baseDir = path.join(
            process.cwd(),
            Object.keys(parsed)[0]?.split('/')[0]
        );
        

        console.log('\n🛠 Generating GraphQL schema from models...\n');
        await runGraphQLGeneration(baseDir).then(async res=>{
            //moveDirectory(`${process.cwd()}/graphql-codegen`,`${baseDir}/graphql-codegen`)
            copyAndChangeExtension(`${process.cwd()}/prerequisites/index.txt`,`${baseDir}`,'index.ts')
            copyAndChangeExtension(`${process.cwd()}/prerequisites/tsconfig.txt`,`${baseDir}`,'tsconfig.json')
            await setupAndRun(baseDir)
        })

        console.log('\n🎉 All done! Your complete backend is ready.');
        console.log(`Your project directory: $${Object.keys(parsed)[0]?.split('/')[0]}`)
        // console.log("Next steps:");
        // console.log('Go to project root directory')
        // console.log("1. Create a '.env' file with your MONGO_URI.");
        // console.log("2. Run 'npm install'.");
        // console.log("3. Run 'npm run dev'.");
    } catch (err) {
        console.error('\n❌ Error:', err);
    }
}

main();
