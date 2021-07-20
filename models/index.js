const Traveller = require('./Traveller');
const Location = require('./Location');
const Trip = require('./Trip');

Location.hasMany(Trip, {
    foreignKey: 'location_id'
});

Traveller.hasMany(Trip, {
    foreignKey: 'traveller_id',
    onDelete: 'CASCADE',
});

Traveller.belongsToMany(Location, {
    through: 'trip',
    foreignKey: 'traveller_id'
})

Location.belongsToMany(Traveller, {
    through: 'trip',
    foreignKey: 'location_id',
    as: 'locations'
});

module.exports = { Traveller, Location, Trip };