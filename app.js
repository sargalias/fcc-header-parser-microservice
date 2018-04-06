const express = require('express');
const accepts = require('accepts');

const app = express();

app.get('/api/whoami', (req, res) => {
    let data = {};

    data.ipaddress = req.connection.remoteAddress;

    let languages = req.headers['accept-language'];
    if (languages) {
        data.language = languages.split(',')[0];
    }

    let software = req.headers['user-agent'].match(/\(([^)]+)\)/);
    if (software) {
        data.software = software[1];
    }

    res.json(data);
});

app.get('*', (req, res) => {
    res.redirect('/');
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});