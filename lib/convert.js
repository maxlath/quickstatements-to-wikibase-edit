const formatValue = require('./format_value')
const addSubSnaks = require('./add_sub_snaks')
const removeQuotes = require('./remove_quotes')

module.exports = input => {
  const edits = {}

  input.split('\n').forEach(line => {
    if (line === '') return
    const [ id, property, value, ...subSnaks ] = line.split(/\t/)
    const edit = edits[id] = edits[id] || { id, claims: {} }
    if (property[0] === 'P') addStatement(edit, property, value, subSnaks)
    else if (property[0] === 'L') addLabel(edit, property, value)
    else if (property[0] === 'D') addDescription(edit, property, value)
    else if (property[0] === 'A') addAliases(edit, property, value)
    else if (property[0] === 'S') addSitelink(edit, property, value)
  })

  return {
    edits: Object.values(edits)
  }
}

const addStatement = (edit, property, value, subSnaks) => {
  edit.claims[property] = edit.claims[property] || []
  const formattedValue = formatValue(value)
  const claim = subSnaks.length > 0 ? addSubSnaks(formattedValue, subSnaks) : formattedValue
  edit.claims[property].push(claim)
}

const addLabel = (edit, property, value) => {
  const lang = property.slice(1)
  edit.labels = edit.labels || {}
  edit.labels[lang] = removeQuotes(value)
}

const addDescription = (edit, property, value) => {
  const lang = property.slice(1)
  edit.descriptions = edit.descriptions || {}
  edit.descriptions[lang] = removeQuotes(value)
}

const addAliases = (edit, property, value) => {
  const lang = property.slice(1)
  edit.aliases = edit.aliases || {}
  edit.aliases[lang] = edit.aliases[lang] || []
  edit.aliases[lang].push(...removeQuotes(value).split('|'))
}

const addSitelink = (edit, property, value) => {
  const site = property.slice(1)
  edit.sitelinks = edit.sitelinks || {}
  edit.sitelinks[site] = removeQuotes(value)
}
