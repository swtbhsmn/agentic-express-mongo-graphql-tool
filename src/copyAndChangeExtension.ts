import fs from 'fs';
import path from 'path';

export function copyAndChangeExtension(
  srcFilePath: string,
  destDir: string,
  newFileName: string
): void {
  if (!fs.existsSync(srcFilePath)) {
    throw new Error(`Source file does not exist: ${srcFilePath}`);
  }
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const fileData = fs.readFileSync(srcFilePath, 'utf-8');
  const destFilePath = path.join(destDir, newFileName);
  fs.writeFileSync(destFilePath, fileData, 'utf-8');
}
