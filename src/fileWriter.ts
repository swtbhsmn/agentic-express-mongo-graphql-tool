import fs from 'fs';
import path from 'path';

export function writeFiles(parsed: Record<string, any>) {
    Object.entries(parsed).forEach(([filePath, content]) => {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(
            filePath,
            typeof content === 'string' ? content : JSON.stringify(content, null, 2)
        );
    });

    console.log('✅ Files created successfully.');
}
