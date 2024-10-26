import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
    createLogger,
    id,
    setGlobalContext,
    setLevel,
    setNamespaces,
    setOutput,
} from '../src/index.js'
import type { LogLevel, Logger, LoggerConfig } from '../src/index.js'
import * as outputs from '../src/output_adapters.js'

describe('Logger Module', () => {
    let logger: Logger
    const testNamespace = 'test:*'

    const shareConfig: LoggerConfig = {
        loggers: {},
        levels: ['trace', 'debug', 'info', 'warn', 'error', 'none'],
        outputs: [outputs.json],
        level: 3,
        namespaces: [],
        globalContext: {},
    }

    beforeEach(() => {
        logger = createLogger('testLogger')
    })

    describe('createLogger', () => {
        it('should create a logger instance', () => {
            const newLogger = createLogger('newLogger')
            expect(newLogger).toBeDefined()
            expect(newLogger).not.toBe(logger)
        })

        it('should return the same logger for the same namespace', () => {
            const newLogger = createLogger('testLogger')
            expect(newLogger).toBe(logger)
        })
    })

    describe('setNamespaces', () => {
        it('should set namespaces correctly', () => {
            const config = {
                ...shareConfig,
            }
            setNamespaces(testNamespace, config)
            const parsedNamespaces = config.namespaces
            expect(parsedNamespaces.length).toBeGreaterThan(0)
            expect(parsedNamespaces[0]?.regex?.test('test:namespace')).toBe(true)
        })

        it('should handle invalid namespace input', () => {
            expect(() => setNamespaces('invalid*namespace')).not.toThrow()
        })
    })

    describe('setLevel', () => {
        it('should set the log level correctly', () => {
            const config = {
                ...shareConfig,
            }
            setLevel('info', config)
            expect(config.level).toBe(2)
        })

        it('should throw an error for invalid log level', () => {
            expect(() => setLevel('invalidLevel' as unknown as LogLevel)).toThrow(
                'Invalid log level: invalidLevel'
            )
        })
    })

    describe('setOutput', () => {
        it('should set the output adapter', () => {
            const config = {
                ...shareConfig,
            }
            const outputAdapter = vi.fn()
            setOutput(outputAdapter, config)

            expect(config.outputs).toContainEqual(outputAdapter)
        })

        it('should set the output adapters array', () => {
            const config = {
                ...shareConfig,
            }
            const outputAdapter = vi.fn()
            setOutput([outputAdapter], config)

            expect(config.outputs).toContainEqual(outputAdapter)
        })
    })

    describe('setGlobalContext', () => {
        it('should set global context correctly', () => {
            const config = {
                ...shareConfig,
            }
            const globalContext = { user: 'testUser' }
            setGlobalContext(globalContext, config)
            expect(config.globalContext).toEqual(globalContext)
        })
    })

    // describe('logging methods', () => {
    //     const testNamespace = 'test:*'
    //     const logMessages: unknown[] = []
    //     const writeSpy = vi.spyOn(outputs.logStream, 'write')
    //     const mockOutput = (logInstance: unknown) => {
    //         logMessages.push(logInstance)
    //     }
    //     const config = {
    //         ...shareConfig,
    //     }

    //     beforeEach(() => {
    //         logger = createLogger('testLogger')
    //         setNamespaces(testNamespace, config)
    //         setLevel('info', config)
    //         config.outputs = [mockOutput]
    //     })
    //     afterEach(() => {
    //         writeSpy.mockClear()
    //     })

    //     it.only('should log messages correctly with contextId', () => {
    //         logger.info('ctxId', 'Test message', { data: 'testData' })

    //         expect(config).toMatchObject({
    //             level: 2,
    //         })
    //         expect(writeSpy).toHaveBeenCalled()
    //     })

    //     it('should call process.stdout.write when logging', () => {
    //         logger.info('ctxId', 'Test message', { data: 'testData' })

    //         expect(writeSpy).toHaveBeenCalled()

    //         const writtenData = writeSpy.mock?.calls?.[0]?.[0]
    //         expect(writtenData).toContain('Test message')
    //     })

    //     it('should not call process.stdout.write when log level is not enabled', () => {
    //         setLevel('error')
    //         logger.info('ctxId', 'Should not log this message')

    //         expect(writeSpy).not.toHaveBeenCalled()
    //     })

    //     it('should log messages correctly without contextId', () => {
    //         logger.warn('Test warning')
    //         expect(writeSpy).toHaveBeenCalled()
    //     })

    //     it('should not log if level is not enabled', () => {
    //         setLevel('error', config)
    //         logger.info('ctxId', 'Should not log this message')

    //         expect(logMessages.length).toBe(2)
    //         expect(logMessages[0]).toMatchObject({
    //             level: 'info',
    //             contextId: 'ctxId',
    //             message: 'Test message',
    //             data: { data: 'testData' },
    //         })
    //         expect(writeSpy).toHaveBeenCalled()
    //     })

    //     it('should force logging when forceLogging is true', () => {
    //         logger.info('ctxId', 'Force log message', undefined, true)

    //         expect(logMessages[2]).toMatchObject({
    //             level: 'info',
    //             contextId: 'ctxId',
    //             message: 'Force log message',
    //         })
    //     })
    // })

    describe('id function', () => {
        it('should generate a unique id', () => {
            const uniqueId = id()
            expect(uniqueId).toMatch(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
            )
        })
    })
})
