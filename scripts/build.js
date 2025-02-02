#!/usr/bin/env node
import { exec } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

async function run() {
    try {
        await Promise.all([
            execAsync('yarn tsc -p tsconfig.lib.json --module NodeNext --outDir lib/esm'),
            execAsync(
                'yarn tsc -p tsconfig.lib.json --module CommonJS --moduleResolution Node --outDir lib/cjs'
            ),
        ])
        await Promise.all([
            writeFile('lib/esm/package.json', '{"type": "module"}'),
            writeFile('lib/cjs/package.json', '{"type": "commonjs"}'),
        ])

        console.log('Compilation successful')
    } catch (error) {
        if (error instanceof Error) {
            console.error('Compilation failed:', error.message)
        } else {
            console.error('Compilation failed:', error)
        }
    }
}

run()
