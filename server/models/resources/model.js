// Mongoose model template
var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId

var modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

modelSchema.methods = {}
modelSchema.statics = {
    getByName: function(name, isLean, next) {
        this.findOne({
            name: name
        })
            .lean(isLean)
            .exec(next)
    }
}

module.exports = mongoose.model('Model', modelSchema)
