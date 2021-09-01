const router = require("express").Router();
const locationRoute =require("../api/locations")
const travellersRoute =require("../api/travellers")
const tripsRoute =require("../api/trips")


router.use("/travellers", travellersRoute)
router.use("/locations", locationRoute)
router.use("/trips", tripsRoute)

module.exports = router