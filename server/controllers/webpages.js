const Webpage = require('../models/Webpage');
const HttpStatus = require('http-status-codes');
const HtmlModule = require('../lib/Html');
const mongoose = require('mongoose');

class Webpages {
    static create(data, cb) {
        const referrer = data.referrer;
        const url =  data.url
        const webpage = new Webpage({url, referrer});
        webpage.setHtmlHash()
                .then(() => webpage.save()) 
                .then((webpage)=> {
                    console.log('webpage created');
                    cb({id: webpage.id})
                })
    }

    static appendIframe(data) {
        const mainFrameID = data.mainFrameID;
        
        Webpage.findOne({'_id': mainFrameID})
                .then((webpage) => {
                    webpage.iframes.push({frameId: data.frameId, url: data.url,parentFrameId: data.parentFrameId});
                    webpage.save();
                    console.log('Iframe appended');
                }) 
    }

    static compare(req, res) {
        const url = req.params.webpage;
                Webpage.findOne({url}).sort('-createdAt')
                    .then((webpage)=> {
                        if(!webpage) { res.sendStatus(HttpStatus.NOT_FOUND) }

                        HtmlModule.fetchHtml(url)
                            .then((html) => {
                                const currentHtmlHash = HtmlModule.hashHtml(html);
                                const result = currentHtmlHash.toString() === webpage.htmlHash
                                res.send({result})
                            }).catch(e => res.sendStatus(HttpStatus.BAD_REQUEST)) 
                    })
    }

    static getAll(req, res) {
        Webpage
            .aggregate([
                { '$sort': { 'createdAt': 1 } },
                {
                    '$group': {
                        '_id': "$url",
                        'lastViewDate': { $last: "$createdAt" },
                        'count': { $sum: 1 }
                    }
                }
            ])
            .sort('-lastViewDate')
            .then((results) => {
                if(!results.length) {res.sendStatus(HttpStatus.NOT_FOUND)}

                results = results.map((item) => {
                    item.url = item._id
                    return item;
                })
                res.send(results)
            })
            .catch(() => res.sendStatus(HttpStatus.BAD_REQUEST))
    }
}

module.exports = Webpages;