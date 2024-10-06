const express = require('express')
const mongoose = require('mongoose')
const app = express()
const newCollection = require("./SharingSchema")
const cors = require("cors")
app.use(cors())
app.use(express.json());
app.get("/", (req, res)=>{
    res.send("HELLO")
})

mongoose.connect("mongodb+srv://userme:qgGwMzoOZgRDwYWM@cluster0.vp0h6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected");
    app.listen('5000', (req, res)=>{
        console.log("Listening");
    })
    
}).catch(e=>{
    console.log(e);
})

app.post("/shared", async (req, res)=>{
    const data = req.body; 
    console.log(data);
    try {
        const newShare = new newCollection(data);
        await newShare.save();
        res.status(201).send({ message: `video ${data.videoTitle}, ${data.videoId} saved successfully! sent to ${data.recipientEmail} ` });
    }catch (error) {
        console.error("Error saving data: ", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
})


app.get("/received", async(req, res)=>{
    const {userEmail} = req.query 
    console.log(userEmail);
    
    try {
        const sharedVideos = await newCollection.find({recipientEmail: userEmail}); 
        res.status(200).json(sharedVideos); 
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
})