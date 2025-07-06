import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateApp(systemPrompt: string, userDescription: string): Promise<Record<string, any>> {
    const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL_NAME || 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userDescription }
        ],
        response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;

    if (!content) throw new Error('API returned an empty response.');

    //fs.writeFileSync(`${process.cwd()}/gptResponse.json`, JSON.stringify(response));

    const parsed = JSON.parse(content);

    // Parse nested .json strings
    for (const [filePath, fileContent] of Object.entries(parsed)) {
        if (filePath.endsWith('.json') && typeof fileContent === 'string') {
            try {
                parsed[filePath] = JSON.parse(fileContent);
            } catch (err) {
                console.warn(`Skipping nested parse for: ${filePath}`);
            }
        }
    }

    return parsed;
}
