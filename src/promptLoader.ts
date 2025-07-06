import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

export async function getUserPrompt(): Promise<{ systemPrompt: string; description: string }> {
    const promptPath = path.join(process.cwd(), 'prompts', 'system-prompt.txt');

    if (!fs.existsSync(promptPath)) {
        throw new Error(`System prompt not found at ${promptPath}`);
    }

    const systemPrompt = fs.readFileSync(promptPath, 'utf-8');

    const { description } = await inquirer.prompt([
        {
            type: 'input',
            name: 'description',
            message: 'What kind of application would you like to build?',
            default:
                'A survey management system where users can create surveys, which have questions and options. Other users can submit responses.',
        },
    ]);

    return { systemPrompt, description };
}
