const stringPattern = /^"(.*)"$/
const monolingualTextPattern = /\w{2,8}:".*"$/
const timePattern = /^[+-]\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z\/\d{1,2}$/
const quantityPattern = /^(-?[\d.]+)(~[\d.]+)?(U\d+)?$/

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

const formatValue = value => {
  if (value.match(stringPattern)) {
    return removeQuotes(value)
  } else if (value.match(monolingualTextPattern)) {
    let [ language, ...text ] = value.split(':')
    text = removeQuotes(text.join(':'))
    return { text, language }
  } else if (value.match(timePattern)) {
    const [ time, precision ] = value.split('/')
    return { time, precision: parseInt(precision) }
  } else if (value.match(quantityPattern)) {
    let [ , amount, approximation, unit ] = value.match(quantityPattern)
    amount = parseFloat(amount)
    const valueObj = { amount }
    if (unit) valueObj.unit = unit.replace('U', 'Q')
    if (approximation != null) {
      approximation = parseFloat(approximation.slice(1))
      valueObj.lowerBound = amount - approximation
      valueObj.upperBound = amount + approximation
    }
    return valueObj
  } else {
    return value
  }
}

const removeQuotes = text => text.replace(stringPattern, '$1')
