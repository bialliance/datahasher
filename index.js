const express = require('express')
const multer = require('multer')
const fs = require('fs');

const checksum = require('./checksum')

var app = new express()
var upload = multer({dest: './files'})

app.post('/upload', upload.single('file'), (req, res) => {
    var hash = checksum(req.file.path)

    var db = fs.existsSync('./files/db.json') ? JSON.parse(fs.readFileSync('./files/db.json')) : {}
    db[req.file.filename] = hash
    fs.writeFileSync('./files/db.json', JSON.stringify(db))

    // Удалим файл чтобы не засорять сервер.
    fs.unlinkSync(req.file.path)
    // !!! Send hash and file to blockchain.

    res.send({uid: req.file.filename, hash: hash})
})

app.post('/check', upload.single('file'), (req, res) => {
    var hash = checksum(req.file.path)
    // Удалим файл чтобы не засорять сервер.
    fs.unlinkSync(req.file.path)

    // !!! Read data from blockchain.
    var db = fs.existsSync('./files/db.json') ? JSON.parse(fs.readFileSync('./files/db.json')) : {}
    
    res.send({success: db[req.body.uid] == hash})
})

app.get('/files', (req, res) => {
    var db = fs.existsSync('./files/db.json') ? JSON.parse(fs.readFileSync('./files/db.json')) : {}
    res.send(db)
})


app.use(express.static('www'))

app.listen(3000)

