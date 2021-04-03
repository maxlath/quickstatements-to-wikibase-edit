const patterns = require('./patterns')
const removeQuotes = require('./remove_quotes')

module.exports = value => {
  const type = findType(value)
  if (type) return formatters[type](value)
  else return value
}

const findType = value => {
  for (const type in patterns) {
    if (value.match(patterns[type])) return type
  }
}

const formatters = {
  string: removeQuotes,
  monolingualText: value => {
    let [ language, ...text ] = value.split(':')
    text = removeQuotes(text.join(':'))
    return { text, language }
  },
  time: value => {
    const [ time, precision ] = value.split('/')
    return { time, precision: parseInt(precision) }
  },
  quantity: value => {
    let [ , amount, approximation, unit ] = value.match(patterns.quantity)
    amount = parseFloat(amount)
    const valueObj = { amount }
    if (unit) valueObj.unit = unit.replace('U', 'Q')
    if (approximation != null) {
      approximation = parseFloat(approximation.slice(1))
      valueObj.lowerBound = amount - approximation
      valueObj.upperBound = amount + approximation
    }
    return valueObj
  },
}
