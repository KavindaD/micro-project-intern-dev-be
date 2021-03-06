const express = require('express')
const app = express()
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

const dbService = require('./dbService')
const { request, response } = require('express')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Create
app.post('/insert', (request, response) => {
    const newDetails = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.insertNewData(newDetails)

    result
    .then(data => response.json({ success: true}))
    .catch(err => console.log(err))
})


// Read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance()
    const result = db.getAllData()

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
})


// Update
app.put('/update', (request, response) => {
    const admin = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.updateRowById(admin)

    result
    .then(data => response.json({success: true}))
    .catch(err => console.log(err))
})


// Delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params

    const db = dbService.getDbServiceInstance()

    const result = db.deleteRowById(id)

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT, () => console.log('app is running'))
