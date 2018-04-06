const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/whoami', (req, res) => {
    let data = {};

    data.ipaddress = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

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