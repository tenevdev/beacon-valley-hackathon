var mongoose = require('mongoose'),
    Place = require('./place'),
    ObjectId = mongoose.Schema.Types.ObjectId

var offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    expires: {
        type: Date
    }
})

offerSchema.methods = {

    attachToPlace: function(placeId, next) {
        var self = this

        Place.findByIdAndUpdate(placeId, {
            // Add reference to this hub
            $push: {
                offers: self.id
            }
        }, function(err, place) {
            if (err)
                return next(err)
            return next(null, place, self)
        })
    }
}

offerSchema.statics = {
    getByTitle: function(offerTitle, isLean, next) {
        this.findOne({
            title: offerTitle
        })
            .lean(isLean)
            .exec(next)
    }
}

module.exports = mongoose.model('Offer', offerSchema)
