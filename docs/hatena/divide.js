const fs = require('fs')

function main() {
  const data = fs.readFileSync('./www.tohuandkonsome.site.export.txt', 'utf-8')
  const rows = data.split('\n')
  parse(rows)
}

function parse(rows) {
  let stream = null
  let docNumber = 1

  rows.forEach((row, index) => {
    // 記事のSTART
    if (row.startsWith('AUTHOR:')) {
      stream = fs.createWriteStream(`./work/${docNumber}.md`)
      stream.write('---\n')
    }

    stream && stream.write(`${row}\n`)

    // 記事のEOF判定
    if (row.startsWith('--------') && rows[index + 1].startsWith('AUTHOR:')) {
      stream.end('\n')
      stream = null
      docNumber++
    }
  })
}

main()
