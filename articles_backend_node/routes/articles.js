const { Router } = require("express")
const { getAllArticles, addNewArticle, updateArticle, deleteArticle } = require("../controllers/articles")
const { check } = require("express-validator")
const { existArticle } = require("../helpers/validations")
const { validateArticle } = require("../middlewares/validate-articles")


const router = Router()


router.get('/', getAllArticles)
router.post('/', addNewArticle)
router.put('/:id',[
    check('id', 'The id is invalid').isMongoId(),
    check('id').custom(existArticle),
    validateArticle
], updateArticle)
router.delete('/:id',[
    check('id', 'The id is invalid').isMongoId(),
    check('id').custom(existArticle),
    validateArticle
], deleteArticle)


module.exports =router