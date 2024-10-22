import fastJson from 'fast-json-stringify'

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

export const fastStringifyLog = fastJson(logSchema)
