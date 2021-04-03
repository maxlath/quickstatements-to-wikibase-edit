const patterns = require('./patterns')

module.exports = text => text.replace(patterns.string, '$1')
