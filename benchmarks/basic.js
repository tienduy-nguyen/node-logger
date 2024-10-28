#!/usr/bin/env node

import * as logger2 from '@ekino/logger'
import { Suite } from '@jonahsnider/benchmark'
import pino from 'pino'
import * as winston from 'winston'
import * as logger3 from '../lib/esm/index.js'

const suite = new Suite('Logger Benchmark', {
    warmup: { trials: 3000 }, // Run benchmark for 3000ms
    run: { trials: 10_000 }, // Run 1000 warmup trials
})

// Initialize loggers
logger2.setLevel('info')
logger3.setLevel('info')

const ekinoLoggerV2 = logger2.createLogger('benchmark')
const ekinoLoggerV3 = logger3.createLogger('benchmark')
const pinoLogger = pino({
    level: 'info',
    prettyPrint: false,
    destination: pino.destination({ sync: true }), // Synced JSON output
})
const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
})

const message = 'This is a benchmark log message'
const logObject = {
    user: 'John Doe',
    action: 'Test Action',
    timestamp: new Date(),
    details: {
        ipAddress: '192.168.1.1',
        location: 'New York',
        permissions: ['read', 'write', 'admin'],
        metadata: { session: 'abcdef12345', retries: 2 },
    },
}
const contextId = 'a037df3b-dbee-448e-9abb-8024d867ccc8'

async function runBenchmarks() {
    suite
        .addTest('@ekino/logger v2.x', () => {
            ekinoLoggerV2.info(contextId, message, logObject)
        })
        .addTest('@ekino/logger v3.x', () => {
            ekinoLoggerV3.info(contextId, message, logObject)
        })
        .addTest('Winston', () => {
            winstonLogger.info(message, logObject)
        })
        .addTest('Pino', () => {
            pinoLogger.info({
                ctxId: contextId,
                ...logObject,
                message,
            })
        })

    const results = await suite.run()
    return results
}

const results = await runBenchmarks()

const table = [...results]
    .map(([library, histogram]) => [
        library,
        Math.round(1e9 / histogram.percentile(50)), // Median to ops/sec
    ])
    .sort(([, a], [, b]) => b - a)
    .map(([library, opsPerSec]) => ({
        library,
        'ops/sec': opsPerSec.toLocaleString(),
    }))

setTimeout(() => {
    console.table(table)
}, 5000)
