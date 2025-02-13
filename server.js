const express= require('express');
const path= require('path');
const app = express();
const port= 8000;
const file= path.resolve(__dirname, 'index.html');

app.get('/', onhome)
app.get('/about', about)
app.listen(port, () => {
    console.log('Server is running on port 8000');
});

function onhome(req, res) {
    res.send('Hello World');
}

function about(req, res) {
    res.sendFile(file);
}