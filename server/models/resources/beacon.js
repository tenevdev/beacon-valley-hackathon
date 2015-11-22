// Mongoose beacon template
var mongoose = require('mongoose'),
    Place = require('./place'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    HttpError = require('../../utils/errors/httpError')

var beaconSchema = new mongoose.Schema({
    placeName: String,
    beaconId: String
})

beaconSchema.methods = {}
beaconSchema.statics = {
    getPlace: function(id, next) {
        this.findOne({
            beaconId: id
        }, function(err, beacon) {
            if (err) {
                return next(err)
            }
            if (beacon) {
                Place.getByName(beacon.placeName, isLean, next)
            } else {
                err = new HttpError(404, 'A beacon with this id does not exist : ' + id)
                return next(err)
            }
        })
    }
}

module.exports = mongoose.model('Beacon', beaconSchema)
