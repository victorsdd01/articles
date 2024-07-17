
const {Schema, model} = require('mongoose')

const articleSchema = Schema({
    author: {
        type: String,
        required: [true, 'author is required']
    },
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    url: {
        type: String,
        required: [true, 'url is required']
    },
    urlToImage: {
        type: String,
        required: [true, 'urlToImage is required'],
    },
    publishedAt: {
        type: String,
        required: [true, 'publishedAt is required']
    },
})

articleSchema.methods.toJSON = function(){
    const {__v, ...article} = this.toObject()
    return article
}

module.exports = model('Article', articleSchema)