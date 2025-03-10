import mysql from 'mysql2';
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})


export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,  // MySQL password
  database: 'school_management'
});

// test the connection and console log issue if any
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as ID ' + db.threadId);
  });
