const formatValue = require('./format_value')
const addSubSnaks = require('./add_sub_snaks')

module.exports = input => {
  const edits = {}

  input.split('\n').forEach(line => {
    if (line === '') return
    const [ id, property, value, ...subSnaks ] = line.split(/\t/)
    const edit = edits[id] = edits[id] || { id, claims: {} }
    edit.claims[property] = edit.claims[property] || []
    const formattedValue = formatValue(value)
    const claim = subSnaks.length > 0 ? addSubSnaks(formattedValue, subSnaks) : formattedValue
    edit.claims[property].push(claim)
  })

  return {
    edits: Object.values(edits)
  }
}
