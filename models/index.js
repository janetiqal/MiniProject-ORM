const Traveller = require('./Travellers');
const Location = require('./Locations');
const Trip = require('./Trips');

// Trip.hasMany(Traveller, {
//     foreignKey: 'traveller_id',
// })

// Trip.hasOne(Location, {
//     foreignKey: 'location_id'
// })

Traveller.belongsToMany(Location, {
    through: Trip,
    foreignKey: 'traveller_id',
    unique: false
})

Location.belongsToMany(Traveller,{
    through: Trip,
    foreignKey: 'location_id',
    unique: false
})

//obj represents all the tables in the db 
module.exports = {Traveller, Location, Trip};