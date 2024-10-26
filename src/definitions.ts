export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none'

export type Log = {
    level: LogLevel
    time?: Date
    namespace: string
    contextId: string
    meta: Record<string, unknown>
    message: string
    data?: Record<string, unknown>
}
export type Output = Pick<Log, 'contextId' | 'meta' | 'data'>

export type NameSpaceConfig = {
    regex?: RegExp
    level?: number
}

export interface Logger {
    trace: LogMethod
    debug: LogMethod
    info: LogMethod
    warn: LogMethod
    error: LogMethod
    none?: LogMethod
    isLevelEnabled(level: string): boolean | undefined
    canForceWrite?: boolean
}

export type OutputAdapter = (log: Log) => void

export interface LogMethod {
    (contextId: string, message: string, data?: unknown, forceLogging?: boolean): void
    (message: string, data?: unknown, forceLogging?: boolean): void
}

export interface LoggerMethods extends Partial<Record<LogLevel, LogMethod>> {
    isLevelEnabled?: (level: LogLevel) => boolean | undefined
    canForceWrite?: boolean
}

export interface LoggerConfig {
    loggers: Record<string, Logger>
    namespaces: NameSpaceConfig[]
    levels: LogLevel[]
    level: number
    outputs: OutputAdapter[]
    globalContext: Record<string, unknown>
}

export type LogColor = 'red' | 'yellow' | 'blue' | 'white' | 'grey'

export type ReplacerFunction = (key: string | number, value: unknown) => unknown
