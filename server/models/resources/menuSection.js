var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    Place = require('./place'),
    Product = require('./product');

var menuSectionSchema = new mongoose.Schema({
    title: String,
    content: [Product.schema]
})

menuSectionSchema.methods = {
    attachToPlace: function(placeId, next) {
        var self = this

        Place.findByIdAndUpdate(placeId, {
            $push: {
                menu: self.id
            }
        }, function(err, place) {
            if (err)
                return next(err)
            return next(null, place, self)
        })
    }
}
menuSectionSchema.statics = {
    getByName: function(name, isLean, next) {
        this.findOne({
            name: name
        })
            .lean(isLean)
            .exec(next)
    }
}

module.exports = mongoose.model('MenuSection', menuSectionSchema)
