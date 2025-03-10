import express from "express";
import geolib from "geolib"
import dotenv from "dotenv"
import { db } from './config.js';

dotenv.config({
    path: "./.env"
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.json("Welcome to School Management")
})



// to add a new school
app.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // checking input
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding school', error: err });
        }
        res.status(201).json({ message: 'School added successfully', id: result.insertId });
    });
});



// list of schools sorted by proximity
app.get('/listSchools', (req, res) => {
    const { userLatitude, userLongitude } = req.query;

    if (!userLatitude || !userLongitude) {
        return res.status(400).json({ message: 'User latitude and longitude are required' });
    }

    const query = 'SELECT * FROM schools';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving schools', error: err });
        }

        // sorting and calculating distance
        const schoolsWithDistance = results.map(school => {
            const distance = geolib.getDistance(
                { latitude: parseFloat(userLatitude), longitude: parseFloat(userLongitude) },
                { latitude: school.latitude, longitude: school.longitude }
            );
            return { ...school, distance };
        });

        // sorted distance
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(schoolsWithDistance);
    });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});