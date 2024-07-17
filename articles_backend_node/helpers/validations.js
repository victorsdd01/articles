const Article = require('../models/articles')



const existArticle = async (id) => {
    const existArticle = await Article.findById(id)
    if (!existArticle) {
        throw new Error(`The id: ${id} doesn't exist`)
    }
}

module.exports = {
    existArticle
}