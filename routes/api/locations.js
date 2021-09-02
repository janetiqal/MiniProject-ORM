const router = require('express').Router();
const Location= require("../../models/Locations");
const { Traveller, Trip}= require("../../models")



//returns all location data 
router.get('/', async (req,res)=>{
    const locationData = await Location.findAll()
    .catch((err)=>{
        if(err){
            res.status(404).json({message:"No location data found"})
            console.log(err)
        }
    })
    res.status(200)
    res.json(locationData)
})

// POST route /api/locations creates location data and returns a successful response 
router.post("/", async (req,res)=>{
    const locationData = await Location.create(req.body)
    .then((locationData)=>{
    res.json(locationData)
    res.status(200)
    })
    .catch((err)=>{
        if(err){
            res.status(500).json({message:"Unable to update locations data"})
            res.json(err)
        }
    })
})
// GET route /api/locations/:id returns a single location's data, with its associated trips
router.get("/:id", async (req,res)=>{

const location = await Location.findByPk(req.params.id, {
    include:[{model: Traveller, through: Trip, as:'location_spot'}]
});
if(!location){
    res.status(404).json({message: "No location found"})
    return
}
res.status(200).json(location)
    .catch((err)=>{
    console.log(err)
    res.status(500)
})
})

// DELETE route /api/locations/:id removes a location and any trips associated with it and returns a successful response 
router.delete('/:id', async (req,res)=>{
    const locationData = await Location.destroy({
        where:{
            id: req.params.id
        },
    })
    if(!locationData){
        res.status(404)
        res.json({message:"Unable to find location ID"})
        return;
    }
    res.status(200)
    res.json(locationData)
    .catch((err)=>{
        if(err){
            res.json(err)
        }
    })
});
module.exports = router