const express = require("express");
const Employee = require("./lib/employee.js");

const PORT = process.env.PORT || 3001;
const app = express();

const init = new Employee();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'sprite95',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT} 🚀`);
  });


  