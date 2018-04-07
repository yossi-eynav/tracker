const fetch = require('node-fetch');
const sha256 = require('crypto-js/sha256');

class HtmlModule {
     
 static hashHtml(html){
    return sha256(html);
 } 

 static fetchHtml(url) {
    return new Promise((resolve, reject) => {
        if (!url) { reject(); }

        fetch(url)
            .then(response => response.text())
            .then(html => { resolve(html) })
            .catch(e => reject(e))
    })}
}

module.exports = HtmlModule