// Mongoose place template
var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId

var placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    menu: [{
        type: ObjectId,
        ref: 'MenuSection'
    }],
    offers: [{
        type: ObjectId,
        ref: 'Offer'
    }],
    accent: {
        type: ObjectId,
        ref: 'Offer'
    }
})

placeSchema.methods = {}
placeSchema.statics = {
    getByName: function(name, isLean, next) {
        this.findOne({
            name: name
        })
            .lean(isLean)
            .exec(next)
    }
}

module.exports = mongoose.model('Place', placeSchema)
