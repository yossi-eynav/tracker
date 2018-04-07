const mongoose = require('mongoose');
const HtmlModule = require('../lib/Html');

const Webpage = mongoose.model('Webpage', {
    url: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    referrer: {
        type: String,
        lowercase: true,
        trim: true,
    },
    iframes: [mongoose.Schema({
        frameId: {
            type: Number,
            required: true
        },
        url: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        parentFrameId: Number
    })
    ],
    htmlHash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

Webpage.prototype.setHtmlHash = function () {
    return HtmlModule.fetchHtml(this.url)
        .then(html => {
            this.htmlHash = HtmlModule.hashHtml(html);
        })
}

module.exports = Webpage; 