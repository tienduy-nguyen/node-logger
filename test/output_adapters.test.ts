import prettyOutput from 'prettyoutput'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { colors } from '../src/colors.js'
import { json, logStream, pretty, prettyTime, twoDigitNumber } from '../src/output_adapters.js'

describe('Log Output Adapters', () => {
    let writeOutputStub: ReturnType<typeof vi.spyOn>

    beforeAll(() => {
        writeOutputStub = vi.spyOn(logStream, 'write') as unknown as ReturnType<typeof vi.spyOn>
    })

    beforeEach(() => {
        writeOutputStub.mockImplementation(() => {})
    })

    afterEach(() => writeOutputStub.mockClear())
    afterAll(() => writeOutputStub.mockRestore())

    const time = new Date(1547205226232)
    const timeFormatted = '2019-01-11 11:13:46'

    describe('twoDigitNumber', () => {
        it('adds a leading 0 for numbers < 10', () => {
            expect(twoDigitNumber(3)).toBe('03')
            expect(twoDigitNumber(1)).toBe('01')
        })

        it('returns numbers >= 10 unchanged as strings', () => {
            expect(twoDigitNumber(88)).toBe('88')
        })

        it('returns empty string for undefined input', () => {
            expect(twoDigitNumber(undefined)).toBe('')
        })
    })

    describe('prettyTime', () => {
        it('formats time as yyyy-mm-dd hh:mm:ss', () => {
            expect(prettyTime(time)).toBe(timeFormatted)
        })

        it('returns undefined if no time is provided', () => {
            expect(prettyTime(undefined)).toBeUndefined()
        })
    })

    describe('pretty', () => {
        it('writes formatted log output to stdout', () => {
            pretty({
                level: 'warn',
                namespace: 'test1',
                time,
                contextId: 'ctxId',
                meta: { field1: 'value1' },
                message: 'test message',
                data: { someData: 'someValue' },
            })

            const expectedOutput = `${timeFormatted} (test1) [warn] : ${colors.yellow('test message')}\n${prettyOutput({ contextId: 'ctxId', meta: { field1: 'value1' }, data: { someData: 'someValue' } }, { maxDepth: 6 }, 2)}\n`
            expect(writeOutputStub).toHaveBeenCalledWith(expectedOutput)
        })
    })

    describe('json', () => {
        it('writes JSON formatted log output to stdout', () => {
            json({
                level: 'warn',
                namespace: 'test1',
                time,
                contextId: 'ctxId',
                meta: { field1: 'value1' },
                message: 'test message',
                data: { someData: 'someValue' },
            })

            expect(writeOutputStub).toHaveBeenCalledWith(
                `{"level":"warn","time":"2019-01-11T11:13:46.232Z","namespace":"test1","contextId":"ctxId","message":"test message","data":{"someData":"someValue"},"field1":"value1"}\n`
            )
        })

        it('outputs JSON without time if time is undefined', () => {
            json({
                level: 'warn',
                namespace: 'test1',
                time: undefined,
                contextId: 'ctxId',
                meta: { field1: 'value1' },
                message: 'test message',
                data: { someData: 'someValue' },
            })

            expect(writeOutputStub).toHaveBeenCalledWith(
                `{"level":"warn","namespace":"test1","contextId":"ctxId","message":"test message","data":{"someData":"someValue"},"field1":"value1"}\n`
            )
        })
    })
})