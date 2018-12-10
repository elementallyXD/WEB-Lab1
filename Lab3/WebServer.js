'use strict';

const hostname = '127.0.0.1';
const port = 3000;

const fs = require('fs');
let express = require('express');
let bodyParser = require("body-parser");
const fetch = require("node-fetch");

/*const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM(`http://${hostname}:${port}/`).window.document;*/

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.json());

app.get('/', async(req, res) => {
    console.log("Got response: " + res.statusCode);
    if (!req.body) return res.sendStatus(400);

    res.status(200).sendFile(__dirname + "/index.html");
});

// app.post('/', urlencodedParser, (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

app.get('/read', (req, res) => {
    console.log("Got response: " + res.statusCode);
    if (!req.body) return res.sendStatus(400);

    res.sendFile(__dirname + '/public/info/MAP.json');
});

app.post('/send', urlencodedParser, (req, res) => {
    const filePath = __dirname + '/public/info/MAP.json';
    let i = 0;
    let data = JSON.stringify(req.body);
    console.log(`BODY: \n ${ JSON.stringify(req.body)}`);

    if (fs.existsSync(`${__dirname}/public/info/MAP.json`)) {
        fs.unlinkSync(`${__dirname}/public/info/MAP.json`);
        console.log("Data Deleted");
    }
    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        else {
            i++;
            console.log(`Data written to file (${i})`);
            res.end();
        }
    });

    res.send('POST request to the homepage');
});

app.get('/Strategy', (req, res) => {
    res.sendFile(__dirname + '/views/Strategy.html');
});

app.get('/About', (req, res) => {
    res.sendFile(__dirname + '/views/About.html');
});

app.get('/ASOrigin', (req, res) => {
    res.sendFile(__dirname + '/views/ASOrigin.html');
});

app.get('/ASOdyssey', (req, res) => {
    res.sendFile(__dirname + '/views/ASOdyssey.html');
});

app.get('/Shooter', (req, res) => {
    res.sendFile(__dirname + '/views/Shooter.html');
});

app.get('/Products', (req, res) => {
    res.sendFile(__dirname + '/views/Products.html');
});

app.get('/Contacts', (req, res) => {
    res.sendFile(__dirname + '/views/Contacts.html');
});

app.get('/History', (req, res) => {
    res.sendFile(__dirname + '/views/History.html');
});

app.get('/LogIn', (req, res) => {
    res.sendFile(__dirname + '/views/LogIn.html');
});

app.get('/Creators', (req, res) => {
    res.sendFile(__dirname + '/views/Creators.html');
});

app.get('/news/:id', (req, res) => {
    let obj = { title: "Kafka", Name: 21, paragraphs: ['Paragraph', 'Digits: 1, 2, 3', 222] };
    console.log(req.query);
    res.render('news', { newsID: req.params.id, obj: obj });
});

app.post('/news/:id', urlencodedParser, (req, res) => {
    console.log("Got response: " + res.statusCode);
    if (!req.body) return res.sendStatus(400);

    var email = req.body.email;
    var password = req.body.password;

    console.log(`User email = ${email}, password = ${password}`);
    let obj = { title: "Kafka", Name: "Books", paragraphs: ['Paragraph', 'Digits: 1, 2, 3', 222] };

    res.render('news', { newsID: req.params.id, obj: obj, data: req.body });
    res.end("yes");
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})