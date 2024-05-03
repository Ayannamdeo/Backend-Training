const users = require('./mockData');
const cookieparser = require('cookie-parser');
const express = require('express');
const app = express();

app.listen(3001, ()=> console.log("server created successfully"));


app.use(cookieparser());

app.get('/home', (req, res)=> {
    console.log(req);
    return res.status(200).json(users);
});