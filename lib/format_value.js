const patterns = {
  string: /^"(.*)"$/,
  monolingualText: /\w{2,8}:".*"$/,
  time: /^[+-]\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z\/\d{1,2}$/,
  quantity: /^(-?[\d.]+)(~[\d.]+)?(U\d+)?$/,
}

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

const removeQuotes = text => text.replace(patterns.string, '$1')

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
