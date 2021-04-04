require('should')
const convert = require('../lib/convert')

describe('create', () => {
  it('should merge items', () => {
    convert('MERGE	Q1	Q2').merges[0].should.deepEqual({ from: 'Q1', to: 'Q2' })
  })
})
