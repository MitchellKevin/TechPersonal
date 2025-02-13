const express= require('express');
const path= require('path');
const app = express();
const port= 8000;
const file= path.resolve(__dirname, 'index.html');

app.use('/static', express.static('static'));
app.set('view engine', 'ejs');
app.set('views', 'view')
app.get('/', onhome)
app.get('/about', about)
app.get('/movie', movie)
app.listen(port, () => {
    console.log('Server is running on port 8000');
});

function onhome(req, res) {
    res.render('movie', {title: 'Movie', year: 2021});
}

function movie(req, res, next) {
    let movie={
        title: 'Top Gun',
        description: 'Tom Cruise is a fighter pilot'

    }
    res.render('index.ejs', {data: movie})
}

function about(req, res) {
    res.sendFile(file);
}

