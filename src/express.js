const express = require("express");
const path = require('path');
const port = 3000

let app = express();

// Static files
app.use('/', express.static(__dirname + '/'));
app.use('/', express.static(__dirname + '/views/'))

// Set Views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.render('index', {text: 'hey'});
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + 'public/views/index.html');
});


app.listen(port, () => console.info(`We are listening on port ${port}`));

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);
process.on('SIGHUP', handleShutdown);

function handleShutdown() {
    console.info('closing server');
    app.close(() => {
        console.info('server closed.');
        process.exit(0);
    })
}