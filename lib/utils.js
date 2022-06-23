const { writeFile } = require('fs').promises
const crypto = require('crypto')

const createHexHash = input => {
  return crypto.createHash('sha1')
  .update(input)
  .digest('hex')
  .slice(0, 8)
}

const writeCommands = (name, data, hash) => {
  if (!data) return
  const filename = `${hash}-${name}.ndjson`
  console.log(`writing ${filename} (${data.length})`)
  return writeFile(filename, toNdJson(data))
}

const toNdJson = array => array.map(edit => JSON.stringify(edit)).join('\n')

module.exports = {
  createHexHash,
  writeCommands,
}
