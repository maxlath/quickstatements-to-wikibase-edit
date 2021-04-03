const formatValue = require('./format_value')

module.exports = input => {
  const edits = {}

  input.split('\n').forEach(line => {
    if (line === '') return
    const [ id, property, value, ...subSnaks ] = line.split(/\t/)
    const edit = edits[id] = edits[id] || { id, claims: {} }
    edit.claims[property] = edit.claims[property] || []
    const formattedValue = formatValue(value)
    const claim = subSnaks.length > 0 ? addSubSnaks(formattedValue, subSnaks) : formattedValue
    console.log('claim', claim)
    edit.claims[property].push(claim)
  })

  return {
    edits: Object.values(edits)
  }
}

const addSubSnaks = (value, subSnaks) => {
  const claim = { value }
  while (subSnaks.length > 0) {
    const snakProperty = subSnaks.shift()
    const snakValue = subSnaks.shift()
    if (snakProperty[0] === 'P') {
      claim.qualifiers = claim.qualifiers || {}
      claim.qualifiers[snakProperty] = claim.qualifiers[snakProperty] || []
      claim.qualifiers[snakProperty].push(formatValue(snakValue))
    } else {
      throw new Error(`couldn't parse subsnaks: ${JSON.stringify({ snakProperty, snakValue })}`)
    }
  }
  return claim
}
