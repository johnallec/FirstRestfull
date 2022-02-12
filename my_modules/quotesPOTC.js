var path = require('path');
const fs = require('fs');

function GenericQuote(id,quote){
    this.id=id;
    this.quote=quote;
}

var errorQuote = {
    id : -1,
    quote : "No quote"
}

var quotes = [];
var quotesPath = path.join(__dirname, '..', 'resources', 'piratesOfTheCaribbeanQuotes.txt');
var quotesStrings = fs.readFileSync(quotesPath, 'utf8');
if(quotesStrings!=null)
    quotesStrings = quotesStrings.split("\n");
for(let i = 0; i < quotesStrings.length; ++i){
    quotes.push(new GenericQuote(i,quotesStrings[i]));
}

function getQuote(id) {
    if(id < quotes.length)
        return quotes[id];
    return errorQuote;
}

function getLastQuote() {
    return quotes[quotes.length-1];
}

function addQuote(quote) {
    fs.appendFile(quotesPath,"\n"+quote,'utf-8',function(){});
    quotes.push(new GenericQuote(quotes.length, quote));
}

module.exports.getQuote = getQuote;
module.exports.getLastQuote = getLastQuote;
module.exports.addQuote = addQuote;