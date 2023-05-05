// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("hello");
// });

// app.listen(8080);

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to perform arithmetic operations on a number
app.use((req, res, next) => {
  const num = parseInt(req.body.num);

  if (isNaN(num)) {
    res.status(400).send("Invalid number");
    return;
  }

  req.num = num;
  next();
});

// Route handler for the form submission
app.post("/calculate", (req, res) => {
  const num = req.num;
  const operation = req.body.operation;

  let result;

  switch (operation) {
    case "increment":
      result = num + 1;
      break;
    case "decrement":
      result = num - 1;
      break;
    case "square":
      result = num ** 2;
      break;
    default:
      res.status(400).send("Invalid operation");
      return;
  }

  res.send(`Result: ${result}`);
});

// Serve the HTML form to the client
app.get("/", (req, res) => {
  res.send(`
    <form method="POST" action="/calculate">
      <label>
        Enter a number:
        <input type="text" name="num">
      </label>
      <br>
      <label>
        Select an operation:
        <select name="operation">
          <option value="increment">Increment (+1)</option>
          <option value="decrement">Decrement (-1)</option>
          <option value="square">Square</option>
        </select>
      </label>
      <br>
      <button type="submit">Calculate</button>
    </form>
  `);
});

// Start the server
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
