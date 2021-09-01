const Travellers = require('../../models/Travellers');
const router = require('express').Router();


//gets traveler data (w /o trips)
router.get("/", async (req,res)=>{
   Travellers.findAll().then((info)=>{
       res.json(info)
   })
})

//
router.post("/", async (req,res)=>{
    Travellers.create(req.body)
    .then((newTraveler)=>{
        res.json(newTraveler)
    })
    .catch((err)=>{
        res.json(err)
    })
})
module.exports = router