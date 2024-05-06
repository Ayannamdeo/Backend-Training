// 4. Develop a data seeding module that generates mock API responses.
// 5. Create a sample POST API that returns a seeded data as a response.
// 6. Develop an authentication middleware using a JWT dummy token.
// 7. Integrate the authentication middleware with the previously created APIs.
// 8. Adhere to the specified directory structure.
// 9. Write a custom middleware function that logs the incoming requests' method, URL, and timestamp to the console.
// 10. Implement an error-handling middleware that captures errors thrown in the route handlers and sends an appropriate error response.
// 11.Write a series of middleware functions and chain them together to demonstrate how multiple middleware can be applied to a single route.
// 12.Build middleware that adds a custom header to every response. Allow the header value to be configurable.
// 13. Develop middleware that limits the number of requests a user can make in a given time frame. Include parameters for setting the limit.


const server = require('./src/server');

const PORT = 3000;

server().listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`);
})

