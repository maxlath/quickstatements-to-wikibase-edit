require('should')
const convert = require('../lib/convert')

describe('convert', () => {
  it('should convert an entity statement', () => {
    convert('Q4115189	P31	Q1').edits[0].claims.P31[0]
    .should.equal('Q1')
  })

  it('should convert a string statement', () => {
    convert('Q4115189	P373	"Antoni Ignacy Mietelski"').edits[0].claims.P373[0]
    .should.deepEqual('Antoni Ignacy Mietelski')
  })

  it('should convert a monolingual text statement', () => {
    convert('Q1214098	P1476	pl:"Krzyżacy"').edits[0].claims.P1476[0]
    .should.deepEqual({ text: 'Krzyżacy', language: 'pl' })
  })

  it('should convert a time statement', () => {
    convert('Q41576483	P569	+1839-00-00T00:00:00Z/9').edits[0].claims.P569[0]
    .should.deepEqual({ time: '+1839-00-00T00:00:00Z', precision: 9 })
  })

  // How to set the precision?
  xit('should convert a location coordinates statement', () => {
    convert('Q3669835	P625	@43.26193/10.92708').edits[0].claims.P625[0]
    .should.deepEqual({ latitude: 43.26193, longitude: 10.92708, precision: '?' })
  })

  it('should convert a quantity statement', () => {
    convert('Q41576483	P1106	123~0.5U11573').edits[0].claims.P1106[0]
    .should.deepEqual({ amount: 123, unit: 'Q11573', lowerBound: 122.5, upperBound: 123.5 })
  })
})
