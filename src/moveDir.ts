import fs from 'fs';
import path from 'path';

/**
 * Recursively moves a directory from 'srcDir' to 'destDir'.
 */
export function moveDirectory(srcDir: string, destDir: string) {
  if (!fs.existsSync(srcDir)) {
    throw new Error(`❌ Source directory does not exist: ${srcDir}`);
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      moveDirectory(srcPath, destPath); // recursive
    } else {
      fs.renameSync(srcPath, destPath);
    }
  }

  fs.rmdirSync(srcDir);
}
