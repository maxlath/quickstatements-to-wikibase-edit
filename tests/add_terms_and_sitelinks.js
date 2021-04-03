require('should')
const convert = require('../lib/convert')

describe('add terms and sitelinks', () => {
  it('should add a label', () => {
    convert('Q340122	Lpl	"Cyprian Kamil Norwid"').edits[0].labels.pl
    .should.equal('Cyprian Kamil Norwid')
  })

  it('should add a alias', () => {
    convert('Q340122	Aen	"Cyprjan Kamil Norwid"').edits[0].aliases.en
    .should.deepEqual([ 'Cyprjan Kamil Norwid' ])
  })

  it('should multiple aliases', () => {
    convert('Q340122	Aen	"Cyprian Kamil Norwid|Cypryan Kamil Norvid"').edits[0].aliases.en
    .should.deepEqual([ 'Cyprian Kamil Norwid', 'Cypryan Kamil Norvid' ])
  })

  it('should add a description', () => {
    convert('Q340122	Dde	"polnischer Dichter"').edits[0].descriptions.de
    .should.equal('polnischer Dichter')
  })

  it('should add a sitelink', () => {
    convert('Q340122	Szhwiki	"塞浦路斯·諾爾維特"').edits[0].sitelinks.zhwiki
    .should.equal('塞浦路斯·諾爾維特')
  })
})
