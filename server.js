const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 8000

const uri = "mongodb+srv://gachanjaprince:UJu5sbF5Iqj67spi@cluster0.5jwm4mk.mongodb.net/?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())
app.use("/static", express.static('./static'))



MongoClient.connect(uri)
    .then(client=> {
        console.log('Connected to Database')
        const db = client.db('startrek-api')
        const infoCollection = db.collection('alien-info')

        app.get('/api/:alienName', (req, res)=> {
            const alienName = req.params.alienName.toLowerCase()
            
            infoCollection.find({speciesName: alienName}).toArray()
                .then(results=> {
                    console.log(results)
                    res.json(results[0])
                })
                .catch(err=> console.error(err))
        })
    })
    .catch(err => console.error(err))

app.listen(process.env.PORT || PORT, ()=> {
    console.log('Server is running')
})
