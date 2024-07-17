const { response } = require('express')
const Article = require('../models/articles')

const getAllArticles = async (req, res = response) => {
    const articles = await Article.find()
    res.status(200).json(articles)
}

const addNewArticle = async (req, res = response) => {
    const body = req.body
    const newArticle = new Article(body)
    const resp = await newArticle.save()
    res.status(200).json(resp)
}

const updateArticle = async (req, res = response) => {
    const {id} =  req.params
    const data = req.body
    const updatedArticle = await Article.findByIdAndUpdate(id, data, {new: true})
    res.status(200).json(updatedArticle)
}

const deleteArticle = async (req, res = response) => {
    const {id} = req.params
    const article =  await Article.findByIdAndDelete(id)
    res.status(200).json(article)
}

module.exports = {
    getAllArticles,
    addNewArticle,
    updateArticle,
    deleteArticle
}