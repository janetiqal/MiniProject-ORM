const router = require("express").Router();
const locationRoute =require("../api/locations")
const travellersRoute =require("../api/travellers")
const tripsRoute =require("../api/trips")
const loginRoute =require("../api/login")



router.use("/travellers", travellersRoute)
router.use("/locations", locationRoute)
router.use("/trips", tripsRoute)
router.use("/login", loginRoute)

module.exports = router