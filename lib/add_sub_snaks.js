const formatValue = require('./format_value')

module.exports = (value, subSnaks) => {
  const claim = { value }
  while (subSnaks.length > 0) {
    let snakProperty = subSnaks.shift()
    const snakValue = subSnaks.shift()
    if (!snakValue) throw new Error(`missing snak value: ${JSON.stringify({ snakProperty })}`)

    if (snakProperty[0] === 'P') {
      claim.qualifiers = claim.qualifiers || {}
      claim.qualifiers[snakProperty] = claim.qualifiers[snakProperty] || []
      claim.qualifiers[snakProperty].push(formatValue(snakValue))
    } else if (snakProperty[0] === 'S') {
      snakProperty = snakProperty.replace('S', 'P')
      claim.references = claim.references || {}
      claim.references[snakProperty] = claim.references[snakProperty] || []
      claim.references[snakProperty].push(formatValue(snakValue))
    } else {
      throw new Error(`couldn't parse subsnaks: ${JSON.stringify({ snakProperty, snakValue })}`)
    }
  }
  return claim
}
