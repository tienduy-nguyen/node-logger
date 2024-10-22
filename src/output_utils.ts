const fastJson = require('fast-json-stringify')

type ReplacerFunction = (key: string | number, value: unknown) => unknown

const logSchema = {
    title: 'Log',
    type: 'object',
    properties: {
        level: { type: 'string' },
        time: {
            type: ['string', 'number', 'null'],
        },
        namespace: { type: 'string' },
        contextId: { type: ['string', 'null'] },
        message: { type: ['string', 'null'] },
        meta: {
            type: ['object', 'null'],
            additionalProperties: true,
        },
        data: {
            type: ['object', 'null'],
            additionalProperties: true,
        },
    },
    additionalProperties: true,
}

const fastStringifyLog = fastJson(logSchema)

/**
 * Replace circular reference when used with JSON.stringify
 * Usage : JSON.stringify(element, getCircularReplacer())
 */
export const getCircularReplacer = (): ReplacerFunction => {
    const seen = new WeakSet()
    return (_key: string | number, value: unknown): unknown => {
        if (isObject(value)) {
            if (seen.has(value)) return
            seen.add(value)
        }
        return value
    }
}

/**
 * JSON.stringify with support for errors descriptions
 * You should add a try catch around it to avoid error
 * @param {*} log - json object
 * @returns {string} - stringified log or error log if can not stringify
 */
export const stringifyLog = (log: Record<string, unknown>): string => {
    try {
        return fastStringifyLog(log)
    } catch (e) {
        return fastStringifyLog(log, getCircularReplacer())
    }
}

export const isObject = (val: unknown): val is Record<string, unknown> =>
    !!val && typeof val === 'object' && !Array.isArray(val)
