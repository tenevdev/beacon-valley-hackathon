// Mongoose beacon template
var mongoose = require('mongoose'),
    Place = require('./place'),
    ObjectId = mongoose.Schema.Types.ObjectId

var beaconSchema = new mongoose.Schema({
    placeName: String,
    beaconId: String
})

beaconSchema.methods = {}
beaconSchema.statics = {
    getPlace: function(id, isLean, next) {
        this.findOne({
            beaconId: id
        }, function(err, beacon){
            if(err) {
                return next(err)
            }
            Place.getByName(beacon.placeName, isLean, next)
        })
    }
}

module.exports = mongoose.model('Beacon', beaconSchema)
