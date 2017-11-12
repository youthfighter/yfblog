var htmlToText = require('html-to-text')
module.exports = {
  getText (html) {
    return htmlToText.fromString(html, {
      wordwrap: false,
      ignoreHref: true,
      ignoreImage: true,
      uppercaseHeadings: false,
      preserveNewlines: false
   }).replace(/[ \n]/g,'')
  }
}