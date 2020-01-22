const bodyParser = require('body-parser');
const service = require('restana')({});
const fs = require('fs');

service.use(bodyParser.json());

service.get('/api/:folder/:locale', (req, res) => {
    fs.readFile(`./locales/${req.params.folder}/${req.params.locale}.json`, 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data)
    });
});

service.start(3000);
