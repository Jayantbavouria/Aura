const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const outputFile = path.join(rootDir, 'full_codebase.txt');

const includeDirs = ['src'];
const includeFiles = ['package.json', 'next.config.ts', 'tsconfig.json', 'drizzle.config.ts', '.env.example'];

let content = '';

function processFile(filePath) {
    const relativePath = path.relative(rootDir, filePath);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    content += `\n\n--- Start of File: ${relativePath} ---\n`;
    content += fileContent;
    content += `\n--- End of File: ${relativePath} ---\n`;
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                walkDir(filePath);
            }
        } else {
            // Include common source extensions
            if (/\.(ts|tsx|js|jsx|css|json|md|prisma|sql)$/.test(file)) {
                processFile(filePath);
            }
        }
    }
}

// Process root files
for (const file of includeFiles) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
        processFile(filePath);
    }
}

// Process include directories
for (const dir of includeDirs) {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath)) {
        walkDir(dirPath);
    }
}

fs.writeFileSync(outputFile, content);
console.log(`Created ${outputFile}`);
