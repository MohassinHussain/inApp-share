const express = require('express');
const mongoose = require('mongoose');
const app = express();
const newCollection = require("./SharingSchema");
const userCollection = require('./UserSchema');
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("HELLO");
});

// MongoDB connection
mongoose.connect("mongodb+srv://userme:qgGwMzoOZgRDwYWM@cluster0.vp0h6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log("Listening on port 5000");
        });
    })
    .catch(e => {
        console.log(e);
    });

// Endpoint to save shared videos
app.post("/shared", async (req, res) => {
    const data = req.body; 
    console.log(data);
    try {
        const newShare = new newCollection(data);
        await newShare.save();
        res.status(201).send({ message: `Video ${data.videoTitle}, ${data.videoId} saved successfully! sent to ${data.recipientEmail}` });
    } catch (error) {
        console.error("Error saving data: ", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Endpoint to add a mate
app.post("/addedMate", async (req, res) => {
    const { userEmail, mates } = req.body; 

    try {
        // Find the user by email
        const currentUser = await userCollection.findOne({ userEmail });

        if (currentUser) {
            // Update the existing user's mates
            currentUser.mates = mates; // Update the mates field
            await currentUser.save(); // Save the updated user
            
            return res.status(200).send({ message: `Updated mate, current mates: ${currentUser.mates}` });
        } else {
            // If the user does not exist, create a new user document
            const mateAdded = new userCollection({ userEmail, mates });
            await mateAdded.save();
            
            console.log(req.body);
            return res.status(201).send({ message: `Added mate by creating doc, current mates: ${mates}` });
        }
        
    } catch (error) {
        console.error("Error saving data: ", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


// Endpoint to fetch received videos
app.get("/received", async (req, res) => {
    const { userEmail } = req.query;
    console.log("mail from received endpoint " +userEmail);
    try {
        const sharedVideos = await newCollection.find({ recipientEmail: userEmail }); 
        res.status(200).json(sharedVideos); 
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Endpoint to get the current user's mates
app.get("/currentUser", async (req, res) => {
    const { userEmail } = req.query;
    console.log("mail from currentUSer Endpoint " +userEmail);
    
    try {
        const userData = await userCollection.findOne({  userEmail }); // Fetch only the mates field
        if (userData) {
            console.log("Data fetched " + userData.mates);
            res.status(200).json(userData.mates); // Return mates if found
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});



// delete mate

app.delete("/deleteMate", async (req, res) => {
    const { emailToDelete } = req.body; //mate to delete
    const { currentUser } = req.query; // Keep the query for current user

    try {
        // Find the user
        const user = await userCollection.findOne({ userEmail: currentUser });
        
        if (user) {
            
            user.mates = user.mates.filter(mate => mate.email !== emailToDelete);
            await user.save(); // Save the updated user document

            return res.status(200).send({ message: "Mate deleted successfully." });
        } else {
            return res.status(404).send({ message: "User not found." });
        }
    } catch (error) {
        console.error("Error deleting mate: ", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


