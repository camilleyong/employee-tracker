const express = require("express");
const start = require("./lib/employee.js");

const PORT = process.env.PORT || 3001;
const app = express();

// const init = new Employee();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT} 🚀`);
    start();
  });

// init.start();
  