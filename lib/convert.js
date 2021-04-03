const formatValue = require('./format_value')

module.exports = input => {
  const edits = {}

  input.split('\n').forEach(line => {
    if (line === '') return
    const [ id, property, value ] = line.split(/\t/)
    const edit = edits[id] = edits[id] || { id, claims: {} }
    edit.claims[property] = edit.claims[property] || []
    edit.claims[property].push(formatValue(value))
  })

  return {
    edits: Object.values(edits)
  }
}
