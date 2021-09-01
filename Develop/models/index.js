const Traveller = require('./Travellers');
const Location = require('./Locations');
const Trip = require('./Trips');

Trip.hasMany(Traveller, {
    foreignKey: 'traveller_id'
})

Trip.hasOne(Location, {
    foreignKey: 'location_id'
})

Traveller.belongsTo(Trip, {
    foreignKey: 'traveller_id'
})

Location.belongsTo(Trip,{
    foreignKey: 'location_id'
})

//obj represents all the tables in the db 
module.exports = {Traveller, Location, Trip};