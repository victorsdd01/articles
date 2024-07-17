const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/connection')
const fs = require('fs')
const path = require('path');
const Article = require('../models/articles')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.path = '../db/data.json'
        this.paths = {
            articles:'/api/articles',
        }

        this.connectDB()

        this.middlewares()

        this.routes()
    }

    async connectDB(){
        const connected = await dbConnection()
        if (connected) {
            //TODO validate if exist data in the DB
            const articles =  await Article.find()
            if (articles.length === 0) {
                console.log('There are not data in the db')
                await this.uploadJsonToMongo()
            }
        }

    }

    async uploadJsonToMongo(){
        try {
            const filePath = path.resolve(__dirname, '../db/data.json')
            const articles = fs.readFileSync(filePath, 'utf-8')
            const parsed = JSON.parse(articles)
    
            for (let item of parsed) { 
                const article = new Article(item)
                await article.save()
            }
            console.log('Data saved successfully.')
        } catch (error) {
            console.error(`Error trying to upload the data in MongoDB: ${error}`)
        }
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes (){
       this.app.use(this.paths.articles, require('../routes/articles'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`listen in ${this.port}`)
        })
    }

}


module.exports = Server