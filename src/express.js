import express from 'express';
import path from 'path';
const port = 3000

let app = express();

// Static files
app.use('/', express.static(path.join(__dirname)));
app.use('/', express.static(path.join(__dirname, 'views')));
//app.use(favicon(path.join(__dirname, 'favicon.ico')));

// Set Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => console.info(`We are listening on port ${port}`));

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);
process.on('SIGHUP', handleShutdown);

function handleShutdown() {
    console.info('closing server');
    console.info('server closed.');
    process.exit(0);
}