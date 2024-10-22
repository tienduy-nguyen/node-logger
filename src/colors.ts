const formatter = (open: string, close: string) => (input: string) => open + input + close

const createColors = () => ({
    reset: formatter('\x1b[0m', '\x1b[0m'),
    red: formatter('\x1b[31m', '\x1b[39m'),
    yellow: formatter('\x1b[33m', '\x1b[39m'),
    blue: formatter('\x1b[34m', '\x1b[39m'),
    white: formatter('\x1b[37m', '\x1b[39m'),
    grey: formatter('\x1b[90m', '\x1b[39m'),
})

const colors = createColors()
export { colors }
