// Incorporate the TypeSCript with the previous code.


// const server = require('./src/server');
import server from './server';

const PORT: Number = 3000;

server().listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`);
})

