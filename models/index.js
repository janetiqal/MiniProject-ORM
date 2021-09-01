const Traveller = require('./Travellers');
const Location = require('./Locations');
const Trip = require('./Trips');


Traveller.belongsToMany(Location, {
    through: {
    model:Trip,
    foreignKey: 'traveller_id',
    unique:false
},
    as: 'traveller_spot'
})

Location.belongsToMany(Traveller,{
    through:{
        model: Trip,
        foreignKey: 'location_id',
        unique:false
    },
    as: 'location_spot',
})

//obj represents all the tables in the db 
module.exports = {Traveller, Location, Trip};