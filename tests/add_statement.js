require('should')
const convert = require('../lib/convert')

describe('add statement', () => {
  it('should add an entity statement', () => {
    convert('Q4115189	P31	Q1').edits[0].claims.P31[0]
    .should.equal('Q1')
  })

  it('should add a string statement', () => {
    convert('Q4115189	P373	"Antoni Ignacy Mietelski"').edits[0].claims.P373[0]
    .should.deepEqual('Antoni Ignacy Mietelski')
  })

  it('should add a monolingual text statement', () => {
    convert('Q1214098	P1476	pl:"Krzyżacy"').edits[0].claims.P1476[0]
    .should.deepEqual({ text: 'Krzyżacy', language: 'pl' })
  })

  it('should add a time statement', () => {
    convert('Q41576483	P569	+1839-00-00T00:00:00Z/9').edits[0].claims.P569[0]
    .should.deepEqual({ time: '+1839-00-00T00:00:00Z', precision: 9 })
  })

  // How to set the precision?
  xit('should add a location coordinates statement', () => {
    convert('Q3669835	P625	@43.26193/10.92708').edits[0].claims.P625[0]
    .should.deepEqual({ latitude: 43.26193, longitude: 10.92708, precision: '?' })
  })

  it('should add a quantity statement', () => {
    convert('Q41576483	P1106	123~0.5U11573').edits[0].claims.P1106[0]
    .should.deepEqual({ amount: 123, unit: 'Q11573', lowerBound: 122.5, upperBound: 123.5 })
  })

  it('should add a statement with a qualifier', () => {
    convert('Q41577083	P570	+1600-00-00T00:00:00Z/7	P1319	+1586-00-00T00:00:00Z/9').edits[0].claims.P570[0]
    .should.deepEqual({
      value: { time: '+1600-00-00T00:00:00Z', precision: 7 },
      qualifiers: { P1319: [ { time: '+1586-00-00T00:00:00Z', precision: 9 } ] }
    })
  })

  it('should add a statement with a reference', () => {
    convert('Q22124656	P21	Q6581097	S143	Q24731821	S813	+2017-10-04T00:00:00Z/11')
    .edits[0].claims.P21[0]
    .should.deepEqual({
      value: 'Q6581097',
      references: { P143: [ 'Q24731821' ], P813: [ { time: '+2017-10-04T00:00:00Z', precision: 11 } ] }
    })
  })

  it('should set reconciliation to merge mode', () => {
    const editEntry = convert('Q4115189	P31	Q1').edits[0]
    editEntry.reconciliation.mode.should.equal('merge')
  })

  it('should add a statement with snaptype "somevalue"', () => {
    convert('Q41576483	P569	somevalue').edits[0].claims.P569[0]
    .should.deepEqual({ snaktype: 'somevalue' })
  })

  it('should add a statement with snaptype "novalue"', () => {
    convert('Q41576483	P569	novalue').edits[0].claims.P569[0]
    .should.deepEqual({ snaktype: 'novalue' })
  })

  it('should add a qualifier with snaptype "somevalue"', () => {
    convert('Q41576483	P370	foo	P369	somevalue').edits[0].claims.P370[0].qualifiers.P369[0]
    .should.deepEqual({ snaktype: 'somevalue' })
  })

  it('should add a qualifier with snaptype "novalue"', () => {
    convert('Q41576483	P370	foo	P369	novalue').edits[0].claims.P370[0].qualifiers.P369[0]
    .should.deepEqual({ snaktype: 'novalue' })
  })

  it('should add a reference with snaptype "somevalue"', () => {
    convert('Q41576483	P370	foo	S369	somevalue').edits[0].claims.P370[0].references.P369[0]
    .should.deepEqual({ snaktype: 'somevalue' })
  })

  it('should add a reference with snaptype "novalue"', () => {
    convert('Q41576483	P370	foo	S369	novalue').edits[0].claims.P370[0].references.P369[0]
    .should.deepEqual({ snaktype: 'novalue' })
  })
})