require('should')
const convert = require('../lib/convert')

describe('create', () => {
  it('should create an item', () => {
    convert(`CREATE
LAST	Sfrwiki	"Le croissant magnifique!"
LAST	Lfr	"Le croissant magnifique!"`).creations[0].should.deepEqual({
      labels: { fr: 'Le croissant magnifique!' },
      sitelinks: { frwiki: 'Le croissant magnifique!' }
    })
  })
})
