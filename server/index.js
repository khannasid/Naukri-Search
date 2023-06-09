const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');

const scrapers = require('./scrapping');
// const db = require('./db')

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/creators', async (req, res) => {
    // const creators = await db.getAllCreators();
    const creators = {
        job: 'Backend',
        company: 'UbiSoft',
    }
    res.send(creators)
})

app.post('/creators', async (req, res) => {
    console.log(req.body)
    const channelData = await scrapers.scrapeChannel(req.body.channelURL);
    console.log(channelData);
    const creators = {
        job: channelData.jobmain,
        company : channelData.companymain,
    }
    res.send(creators);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
