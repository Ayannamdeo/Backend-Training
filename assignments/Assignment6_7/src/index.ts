// Establish health check routes using classes.

// Refactor all previous code to incorporate classes and interfaces.

import server from './server';

const PORT: Number = 3000;

const app = new server();

app.getApp().listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`);
})

