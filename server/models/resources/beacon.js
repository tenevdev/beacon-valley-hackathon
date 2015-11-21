// Mongoose beacon template
var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId

var beaconSchema = new mongoose.Schema({
    place: {
        type: ObjectId,
        required: true
    },
    beaconId: String
})

beaconSchema.methods = {}
beaconSchema.statics = {
    getPlace: function(id, next) {
        this.findOne({
            beaconId: id
        })
            .populate('place')
            .exec(function(err, beacon) {
                return next(err, beacon.place)
            })
    }
}

module.exports = mongoose.model('Beacon', beaconSchema)
