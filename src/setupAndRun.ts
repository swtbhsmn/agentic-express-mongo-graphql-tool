import { exec } from 'child_process';
import { spawn } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

async function setupAndRun(baseDir: string) {
    try {
        console.log('\n📦 Installing dependencies...');
        await execPromise('npm install', { cwd: baseDir });

        console.log('\n🚀 Starting the development server...');
        const dev = spawn('npm', ['run', 'dev'], {
            cwd: baseDir,
            stdio: 'inherit',
            shell: true,
        });

        dev.on('error', (err) => {
            console.error('❌ Failed to start development server:', err);
        });

        dev.on('exit', (code) => {
            console.log(`💡 Development server exited with code ${code}`);
        });

    } catch (err) {
        console.error('\n❌ Error during setup:', err);
    }
}

export default setupAndRun;