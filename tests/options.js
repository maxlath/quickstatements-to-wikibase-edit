const should = require('should')
const convert = require('../lib/convert')

describe('options', () => {
  describe('reconciliation mode', () => {
    it('should default to reconciliation mode=merge', () => {
      convert('Q41576483	P370	foo').edits[0].reconciliation.mode.should.equal('merge')
    })

    it('should accept to customize to reconciliation mode', () => {
      convert('Q41576483	P370	foo', { reconciliation: { mode: 'skip-on-value-match' }})
      .edits[0].reconciliation.mode.should.equal('skip-on-value-match')
    })

    it('should allow to disable reconciliation', () => {
      const { edits } = convert('Q41576483	P370	foo', { reconciliation: { mode: 'none' }})
      should(edits[0].reconciliation).not.be.ok()
    })
  })
})
