const dotenv= require('dotenv');
const { name } = require('ejs');
dotenv.config();
const express= require('express');
const mongodb= require('mongodb');
const { MongoClient } = require('mongodb');
const path= require('path');
const app = express();
const port= 8000;
const file= path.resolve(__dirname, 'index.html');
const db_name = process.env.NAME_DB;
const uri = process.env.URI;
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database');
    }
}

connect();

app.use('/static', express.static('static'));
app.set('view engine', 'ejs');
app.set('views', 'view')
app.get('/', onhome)
app.get('/about', about)
app.get('/movie', movie)

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/user', nieuwe_gebruiker)
app.listen(port, () => {
    console.log('Server is running on port 8000');
});




app.post('/user', async (req, res) => {
    try {
        const database = client.db(process.env.NAME_DB);
        const usersCollection = database.collection('gebruiker');
        
        const newUser = {
            name: req.body.name,
            surname: req.body.surname,
        };

        await usersCollection.insertOne(newUser);
        console.log('New user inserted:', newUser);
        res.render('user.ejs', { data: newUser });
    } catch (error) {
        console.error('Error inserting new user:', error);
        res.status(500).send('Error inserting new user');
    }
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



function nieuwe_gebruiker(req, res) {
    let user={
        name: req.body.name,
        surname: req.body.surname,
    }
    console.log(req.body);
    res.render('user.ejs', {data: user})
}