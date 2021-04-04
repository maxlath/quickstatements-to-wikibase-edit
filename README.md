## quickstatements-to-wikibase-edit

Tools to convert [QuickStatements commands](https://www.wikidata.org/wiki/Help:QuickStatements#Command_sequence_syntax) into [wikibase-edit format](https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#api).

:warning: Status: experimental

**Supported features**
* add statements with qualifiers and references
* add labels, descriptions, aliases, sitelinks
* create items
* merge items

**Missing features**
* remove statement
* no check is performed to see if a statement already exists, creating duplicated statement if it does

## CLI
### Install
```sh
npm install --global wikibase-cli quickstatements-to-wikibase-edit

# Should generate edits, creations, and merges NDJSON files, depending on the commands content
quickstatements-to-wikibase-edit ./quickstatement_commands.txt

cat 0ba886b6-edits.ndjson | wb edit-entity --batch --summary 'fixing stuffs'
cat 0ba886b6-creations.ndjson | wb create-entity --batch --summary 'fixing stuffs'
cat 0ba886b6-merges.ndjson | wb merge-entity --batch --summary 'fixing stuffs'
```
### Usage

## JS
### Install
```sh
npm install wikibase-edit quickstatements-to-wikibase-edit
```

### Usage
```js
const wbEdit = require('wikibase-edit')({ instance, credentials })
const quickstatementsToWikibaseEdit = require('quickstatements-to-wikibase-edit')

const commands = `
Q4115189	P31	Q1
Q4115189	P373	"Antoni Ignacy Mietelski"
Q1214098	P1476	pl:"Krzyżacy"
CREATE
LAST	Sfrwiki	"Le croissant magnifique!"
LAST	Lfr	"Le croissant magnifique!"
Q340122	Aen	"Cyprjan Kamil Norwid"
MERGE	Q1	Q2
Q340122	Aen	"Cyprian Kamil Norwid|Cypryan Kamil Norvid"
`

const { edits, creations, merges } = quickstatementsToWikibaseEdit(commands)

for (const edit of edits) {
  await wbEdit.entity.edit(edit)
}

for (const creation of creations) {
  await wbEdit.entity.create(creation)
}

for (const merge of merges) {
  await wbEdit.entity.merge(merge)
}
```
