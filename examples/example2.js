const logger = require('../lib/index')

logger.setNamespaces('root:*')
logger.setLevel('debug')

const log = logger.createLogger('root:testing')
log.debug('ctxId', 'User login attempt', {
    username: 'johndoe',
    ipAddress: '192.168.1.1',
    timestamp: new Date().toISOString(),
})
