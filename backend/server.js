const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors"); // Import the cors middleware

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup", // Use the name of the database you created
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database: " + err.stack);
        return;
    }
    console.log("Connected to the database as ID " + connection.threadId);
});

// Middleware to parse JSON in the request body
app.use(express.json());

// Define a POST route to add a new user
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const sql = "INSERT INTO login (name, email, password ) VALUES (?,?,?)";

    // Insert the new user into the database
    connection.query(sql, [name, email, password], (error, data) => {
        if (error) {
            console.error("Error inserting user into the database: " + error.stack);
            return res.status(500).json({ error: "Failed to insert user" });
        }

        res.json(data);
    });
});

/*
This section is GET request

*/

app.post("/login", (req, res) => {
    
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";

    // Insert the new user into the database
    connection.query(sql, [req.body.email, req.body.password], (error, data) => {
        if (error) {
            console.error("Error inserting user into the database: " + error.stack);
            return res.status(500).json({ error: "Failed to insert user" });
        }

        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Fail!");
        }

     
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
