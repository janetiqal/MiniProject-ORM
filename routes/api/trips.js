const router = require('express').Router();
const {Trip, Location, Traveller} = require("../../models")


// POST route /api/trips creates trip data between associated travellers and locations.
router.post("/", async (req,res)=>{
    const tripData = await Trip.create(req.body)
    .then((tripData)=>{
        res.json(tripData)
        res.status(200)
        })
        .catch((err)=>{
            if(err){
                res.status(500).json({message:"Unable to update locations data"})
                res.json(err)
            }
        })
})


//  DELETE route /api/trips/:id removes a trip 
router.delete("/:id", async (req,res)=>{
    const deleteTrip = await Trip.destroy({
        where:{
            id: req.params.id
        }
    })
    if(!deleteTrip){
        res.status(404)
        res.json({mesage: "No trip associated with this ID"})
    }
    res.status(200)
    res.json(deleteTrip)
}) 

module.exports = router