var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    Product = require('./product');

var menuSectionSchema = new mongoose.Schema({
    title: String,
    content: [Product.schema]
})

menuSectionSchema.methods = {}
menuSectionSchema.statics = {
    getByName: function(name, isLean, next) {
        this.findOne({
            name: name
        })
            .lean(isLean)
            .exec(next)
    }
}

module.exports = mongoose.menuSection('MenuSection', menuSectionSchema)
