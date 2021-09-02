const Travellers = require('../../models/Travellers');
const router = require('express').Router();
const { Trip, Location}= require("../../models")

//gets traveler data (w /o trips)
router.get("/", async (req,res)=>{
 const userData = await Travellers.findAll()
 .catch((err)=>{
     res.json(err)
 });
//  console.log(userData)
 res.json(userData)
})

//returns a single traveller w id input and returns all their locations travelled 
router.get("/:id", async (req,res)=>{
    const oneTraveller = await Travellers.findByPk(req.params.id, {
        include:[{model: Location, through: Trip, as: 'traveller_spot'}
        ]})
      if(!oneTraveller){
          res.status(404)
          res.json({message: "No traveller found."})
          return;
      }
      res.status(200);
    res.json(oneTraveller)
    .catch((err)=>{
        res.status(500)
        res.json(err)
    })
    });
 
// creates new traveller and inserts into database
router.post("/", async (req,res)=>{
    Travellers.create(req.body)
    .then((newTraveler)=>{
        res.json(newTraveler)
    })
    .catch((err)=>{
        res.json(err)
    })
})

//delete
router.delete("/:id", async (req,res)=>{
    const deleteTraveler = await Travellers.destroy({
        where: {
            id: req.params.id
        },
    })
      
      if(!deleteTraveler){
          res.status(404)
          res.json({message: "No traveller found."})
          return;
      }
      res.status(200);
    res.json(deleteTraveler)
    .catch((err)=>{
        res.status(500)
        res.json(err)
    })
    });
module.exports = router