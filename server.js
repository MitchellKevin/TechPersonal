const dotenv= require('dotenv');
dotenv.config();
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

// const {MongoClient}= require('mongodb');
// const uri= process.env.URI;
// const db_name= process.env.DB_NAME;

// const client= new MongoClient(uri);
// const database= client.db(db_name);

// async function connect() {
// try {
//     await client.connect();
//     console.log('Connected to the database');
// } catch (error) {
//     console.log('Error connecting to the database');
// }
// }

// connect();

app.post(
    '/movie', 
    async (req, res) => {
    console.log(req.body);
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

