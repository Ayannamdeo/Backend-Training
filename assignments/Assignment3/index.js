// Setup Validation middleware
// Create a thorough document, named validations.md, elucidating the importance of validations in security.
// 4.Write a middleware function to validate user input for a registration form. Check if the required fields are present and if they meet certain criteria (e.g., password strength, email format).
// 5.Create middleware to validate that specific query parameters in a route are numeric. If a non-numeric value is provided, respond with an appropriate error message.
// 6.Implement middleware to validate the geographic location of the client. If the request is not coming from an expected region, respond with an error.
// 7.User Build a validation middleware that dynamically fetches validation rules from a configuration file. The rules should be applied based on the route being accessed.

const express = require("express");
const userRouter = require("./src/routes/userRouter");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`server started at port:${PORT}`);
});
