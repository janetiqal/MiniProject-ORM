const Travellers = require('../../models/Travellers');
const router = require('express').Router();
const { Trip, Location}= require("../../models")
const bcrypt = require('bcrypt');

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
try {
    const newUser = req.body
   newUser.password = await bcrypt.hash(req.body.password, 10)
   const userData = await Travellers.create(newUser)
   res.status(200)
   res.json(userData)
}catch(err){
        res.json(err)
    }
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


//login route
//users password must be hashed for this to work, seeded data wont work. create a new user w the post route, then login. 
router.post('/login' ,async (req,res)=>{
    try {
        const userData = await Travellers.findOne({
             where: {
                 username: req.body.username } 
        }); 
        if (!userData) {
          res.status(404).json({ message: 'Login failed. Please try again!' });
          return;
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
          );
          if (!validPassword) {
            res.status(400).json({ message: 'Login failed. Please try again!' });
            return;
          }
        res.status(200)
        res.json({ message: 'You are now logged in!' });

} catch(err){
    res.status(500).json(err)
}
})
//mimick user login, to get trip data 
// router.get("/logindata", async (req,res)=>{
//     const validPassword = await bcrypt.compare(
//         req.body.password,
//         userTrips.password
//     );
//     const userTrips = await Travellers.findOne(req.body, {
//         where:{
//             username : req.body.username,
//             password: validPassword
//         },
//         include:[{model: Location, through: Trip, as: 'traveller_spot'}
//         ]})
//         res.json(userTrips)
//         // .catch((err)=>{
//         //     res.json(err)
//         // }
// })
module.exports = router
