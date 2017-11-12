var htmlToText = require('html-to-text');
let a = "<h3 id=\"content-aaron-swartz-https-raw-githubusercontent-com-smshen-markdownphotos-master-res-test-jpg-\">content <img src=\"https://raw.githubusercontent.com/smshen/MarkdownPhotos/master/Res/test.jpg\" alt=\"Aaron Swartz\"></h3>\n"
var text = htmlToText.fromString(a, {
   wordwrap: 130,
   ignoreHref: true,
   ignoreImage: true,
   uppercaseHeadings: false
});
console.log(text);