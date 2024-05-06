// Create scenarios that generate all possible error codes.

// 5.Create an asynchronous route that intentionally throws an error.Implement error handling for asynchronous errors within the route.Send an appropriate response to the client, indicating the error.

// 6.Create a route that expects certain parameters in the request. Implement validation checks and throw a validation error if the checks fail. Handle validation errors gracefully and send a JSON response with error details.

const server = require("./src/server");

const PORT = 3000;

server().listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
