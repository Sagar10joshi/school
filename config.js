import mysql from 'mysql2';
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})


export const db = mysql.createConnection({
  host: 'bkgzpte55c8yzpqusvaz-mysql.services.clever-cloud.com',
  user: 'ufxs1w6m5qiiieub',
  password: process.env.PASSWORD,  // MySQL password  
  database: 'bkgzpte55c8yzpqusvaz'
});

// test the connection and console log issue if any
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as ID ' + db.threadId);
  });


  //mysql://ufxs1w6m5qiiieub:OWd0ee3owOVJgVyMMPt1@bkgzpte55c8yzpqusvaz-mysql.services.clever-cloud.com:3306/bkgzpte55c8yzpqusvaz