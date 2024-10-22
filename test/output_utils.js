const test = require('ava')
const { stringify } = require('../src/output_utils.ts')

test('stringify should work even with circular references', (t) => {
    const obj = {
        a: '1',
        b: '2',
    }
    obj.d = obj

    t.notThrows(() => stringify(obj))
    const value = stringify(obj)
    t.is(value, '{"a":"1","b":"2"}')
})
