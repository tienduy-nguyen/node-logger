/**
 * Replace circular reference when used with JSON.stringify
 * Usage : JSON.stringify(element, getCircularReplacer())
 */

type ReplacerFunction = (key: string | number, value: unknown) => unknown

export const getCircularReplacer = (): ReplacerFunction => {
    const seen = new WeakSet()
    return (key: string | number, value: unknown): unknown => {
        if (isObject(value)) {
            if (seen.has(value)) {
                return
            }
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
export const stringify = (log: Record<string, unknown>): string => {
    try {
        return JSON.stringify(log)
    } catch (e) {
        return JSON.stringify(log, getCircularReplacer())
    }
}

export const isObject = (val: unknown): val is Record<string, unknown> =>
    !!val && typeof val === 'object' && !Array.isArray(val)
