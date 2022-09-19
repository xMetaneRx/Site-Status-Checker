const express = require(`express`);
const http = require(`http`);
const https = require(`https`);
const bodyParser = require(`body-parser`);

const app = express();
const port = 3000;

app.set(`views`, `./views`);
app.set(`view engine`, `pug`);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const siteProperties = {
    title: 'Site Status Checker'
}

function checkStatus(protocol, url, req, res) {
    eval(protocol).get(url, () => {
        res.render(`index`, {title: siteProperties.title, url, status: `is available!`});
    }).on(`error`, function(err) {
        res.render(`index`, {title: siteProperties.title, url, status: `is not available!`})
    })
} 

app.get(`/`, (req, res) => {
    res.render(`index`, {title: siteProperties.title, siteStatus: null});
});

app.post(`/status`, (req, res) => {
    const {url} = req.body;
    const protocol = url.split(':/')[0];
    checkStatus(protocol, url, req, res);
})

app.listen(port, () => {
    console.log(`Site status checker listening on port ${port}`);
});