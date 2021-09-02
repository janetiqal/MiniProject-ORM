const router = require('express').Router();
const { Trip, Location, Traveller }= require("../../models")
const bcrypt = require('bcrypt');





//login route
//users password must be hashed for this to work, seeded data wont work. create a new user w the post route, then login. 
router.post('/' ,async (req,res)=>{
    try {
        const userData = await Traveller.findOne({
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


//NOT WORKING AS EXPECTED
//Want to mimick a login: check username and password, if pass=> return travel data of that user
router.post('/check' ,async (req,res)=>{
    try {
        const userData = await Traveller.findOne({
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
     const userTrips = await Traveller.findAll(req.body, {
                    where:{
                        username : req.body.username,
                        password: validPassword
                    },
                    include:[{model: Location, through: Trip, as: 'traveller_spot'}
                    ]})
        res.status(200)
        res.json(userTrips);

} catch(err){
    res.status(500).json(err)
}
})


module.exports=router;