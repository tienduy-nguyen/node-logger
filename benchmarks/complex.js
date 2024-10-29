#!/usr/bin/env node

import {
    createBenchmarkSuite,
    generateNestedObject,
    initializeLoggers,
    runSuiteWithDynamicTimeout,
} from './utils.js'

const { ekinoLoggerV2, ekinoLoggerV3, pinoLogger, winstonLogger } = initializeLoggers()
const suite = createBenchmarkSuite('Logger Benchmark - Complex')
const contextId = 'a037df3b-dbee-448e-9abb-8024d867ccc8'
const logObject = generateNestedObject(10, 2)

suite
    .addTest('@ekino/logger v2.x', () => {
        ekinoLoggerV2.info(
            contextId,
            'This is a benchmark log message for @ekino/logger v2.x',
            logObject
        )
    })
    .addTest('@ekino/logger v3.x', () => {
        ekinoLoggerV3.info(
            contextId,
            'This is a benchmark log message for @ekino/logger v3.x',
            logObject
        )
    })
    .addTest('Winston', () => {
        winstonLogger.info('This is a benchmark log message for Winston', logObject)
    })
    .addTest('Pino', () => {
        pinoLogger.info({
            ctxId: contextId,
            ...logObject,
            message: 'This is a benchmark log message for Pino',
        })
    })

await runSuiteWithDynamicTimeout(suite, 40000)
